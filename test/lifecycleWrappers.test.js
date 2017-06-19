import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import { 
    onComponentWillMount, 
    onComponentDidMount, 
    onComponentWillReceiveProps,
    onComponentWillUpdate,
    onComponentDidUpdate,
    onComponentWillUnmount
} from '../src/lifecycleWrappers'

const TestComponent = () => <p>TEST</p>
const testAction = (method) => ({ type: `TEST_ACTION_${method}` })

const updater = (value1, value2) => (Component) => {
  return class Updater extends React.Component {
    constructor() {
      super()
      this.state = { value: value1 }
    }

    componentDidMount() {
      this.setState({ value: value2 })
    }

    render() {
      return <Component {...this.state} />
    }
  }
}

describe('lifecycleWrappers Tests', () => {
    test('should dispatch action on componentWillMount', () => {
        let mockStore = configureStore()({})

        let WrappedComponent = onComponentWillMount(testAction('componentWillMount'))(TestComponent)

        mount(
            <Provider store={mockStore}>
                <WrappedComponent />
            </Provider>
        )

        expect(mockStore.getActions()).toEqual([testAction('componentWillMount')])
    })

    test('should dispatch action on componentDidMount', () => {
        let mockStore = configureStore()({})

        let WrappedComponent = onComponentDidMount(testAction('componentDidMount'))(TestComponent)

        mount(
            <Provider store={mockStore}>
                <WrappedComponent />
            </Provider>
        )

        expect(mockStore.getActions()).toEqual([testAction('componentDidMount')])
    })

    test('should dispatch action on componentWillReceiveProps', () => {
        let mockStore = configureStore()({})
        
        let WrappedComponent = updater(1, 2)(onComponentWillReceiveProps(testAction('componentWillReceiveProps'))(TestComponent))

        mount(
            <Provider store={mockStore}>
                <WrappedComponent />
            </Provider>
        )

        expect(mockStore.getActions()).toEqual([testAction('componentWillReceiveProps')])
    })

    test('should dispatch action on componentWillUpdate', () => {
        let mockStore = configureStore()({})
        
        let WrappedComponent = updater(1, 2)(onComponentWillUpdate(testAction('componentWillUpdate'))(TestComponent))

        mount(
            <Provider store={mockStore}>
                <WrappedComponent />
            </Provider>
        )

        expect(mockStore.getActions()).toEqual([testAction('componentWillUpdate')])
    })

    test('should dispatch action on componentDidUpdate', () => {
        let mockStore = configureStore()({})
        
        let WrappedComponent = updater("wrong", "expected")(onComponentDidUpdate(testAction('componentDidUpdate'))(TestComponent))

        mount(
            <Provider store={mockStore}>
                <WrappedComponent />
            </Provider>
        )

        expect(mockStore.getActions()).toEqual([testAction('componentDidUpdate')])
    })

    test('should dispatch action on componentWillUnmount', () => {
        let mockStore = configureStore()({})
        
        let WrappedComponent = onComponentWillUnmount(testAction('componentWillUnmount'))(TestComponent)

        let testComponent = mount(
            <Provider store={mockStore}>
                <WrappedComponent />
            </Provider>
        )

        testComponent.unmount()

        expect(mockStore.getActions()).toEqual([testAction('componentWillUnmount')])
    })
})
