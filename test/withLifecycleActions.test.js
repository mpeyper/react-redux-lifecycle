import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import withLifecycleActions from '../src/withLifecycleActions'

const TestComponent = ({message}) => <p>{message}</p>
const testAction = (method) => ({ type: `TEST_ACTION_${method}` })

const updater = (message1, message2) => (Component) => {
  return class Updater extends React.Component {
    constructor() {
      super()
      this.state = { message: message1 }
    }

    componentDidMount() {
      this.setState({ message: message2 })
    }

    render() {
      return <Component {...this.state} />
    }
  }
}

describe('withLifecycleActions Tests', () => {

  test('should dispatch action on componentWillMount', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({ componentWillMount: testAction('componentWillMount') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([testAction('componentWillMount')])
  })

  test('should dispatch action on componentDidMount', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({ componentDidMount: testAction('componentDidMount') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([testAction('componentDidMount')])
  })

  test('should dispatch action on componentWillReceiveProps', () => {
    let mockStore = configureStore()({})
    
    let WrappedComponent = updater("wrong", "expected")(withLifecycleActions({ componentWillReceiveProps: testAction('componentWillReceiveProps') })(TestComponent))

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([testAction('componentWillReceiveProps')])
  })

  test('should dispatch action on componentWillUpdate', () => {
    let mockStore = configureStore()({})
    
    let WrappedComponent = updater("wrong", "expected")(withLifecycleActions({ componentWillUpdate: testAction('componentWillUpdate') })(TestComponent))

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([testAction('componentWillUpdate')])
  })

  test('should dispatch action on componentDidUpdate', () => {
    let mockStore = configureStore()({})
    
    let WrappedComponent = updater("wrong", "expected")(withLifecycleActions({ componentDidUpdate: testAction('componentDidUpdate') })(TestComponent))

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([testAction('componentDidUpdate')])
  })

  test('should dispatch action on componentWillUnmount', () => {
    let mockStore = configureStore()({})
    
    let WrappedComponent = withLifecycleActions({ componentWillUnmount: testAction('componentWillUnmount') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    testComponent.unmount()

    expect(mockStore.getActions()).toEqual([testAction('componentWillUnmount')])
  })

  test('should dispatch action on multiple lifecycle methods', () => {
    let mockStore = configureStore()({})
    
    let WrappedComponent = withLifecycleActions({ componentWillMount: testAction('componentWillMount'), componentWillUnmount: testAction('componentWillUnmount') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    testComponent.unmount()

    expect(mockStore.getActions()).toEqual([testAction('componentWillMount'), testAction('componentWillUnmount')])
  })

  test('should not dispatch action on constructor', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({ constructor: testAction('constructor') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([])
  })

  test('should not dispatch action on render', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({ render: testAction('render') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([])
  })

  test('should not dispatch action on shouldComponentUpdate', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({ shouldComponentUpdate: testAction('shouldComponentUpdate') })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual("<p>expected</p>")
    expect(mockStore.getActions()).toEqual([])
  })
})
