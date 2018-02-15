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
  onComponentWillUnmount,
  onComponentDidCatch
} from '../src/lifecycleWrappers'

const TestComponent = () => <p>TEST</p>
const ErrorComponent = () => {
  throw Error('expected')
}
const testAction = method => ({ type: `TEST_ACTION_${method}` })

const updater = (value1, value2) => Component => {
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

const suppressError = f => {
  const error = console.error
  try {
    console.error = () => {}
    return f()
  } finally {
    console.error = error
  }
}

describe('lifecycleWrappers Tests', () => {
  test('should dispatch action on componentWillMount', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = onComponentWillMount(testAction('componentWillMount'))(TestComponent)

    mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(mockStore.getActions()).toEqual([testAction('componentWillMount')])
  })

  test('should dispatch action on componentDidMount', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = onComponentDidMount(testAction('componentDidMount'))(TestComponent)

    mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(mockStore.getActions()).toEqual([testAction('componentDidMount')])
  })

  test('should dispatch action on componentWillReceiveProps', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = updater(1, 2)(
      onComponentWillReceiveProps(testAction('componentWillReceiveProps'))(TestComponent)
    )

    mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(mockStore.getActions()).toEqual([testAction('componentWillReceiveProps')])
  })

  test('should dispatch action on componentWillUpdate', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = updater(1, 2)(onComponentWillUpdate(testAction('componentWillUpdate'))(TestComponent))

    mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(mockStore.getActions()).toEqual([testAction('componentWillUpdate')])
  })

  test('should dispatch action on componentDidUpdate', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = updater('wrong', 'expected')(
      onComponentDidUpdate(testAction('componentDidUpdate'))(TestComponent)
    )

    mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(mockStore.getActions()).toEqual([testAction('componentDidUpdate')])
  })

  test('should dispatch action on componentWillUnmount', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = onComponentWillUnmount(testAction('componentWillUnmount'))(TestComponent)

    const testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    testComponent.unmount()

    expect(mockStore.getActions()).toEqual([testAction('componentWillUnmount')])
  })

  test('should dispatch action on componentDidCatch', () => {
    const mockStore = configureStore()({})

    const WrappedComponent = onComponentDidCatch(testAction('componentDidCatch'))(ErrorComponent)

    suppressError(() =>
      mount(
        <Provider store={mockStore}>
          <WrappedComponent />
        </Provider>
      )
    )

    expect(mockStore.getActions()).toEqual([testAction('componentDidCatch')])
  })
})
