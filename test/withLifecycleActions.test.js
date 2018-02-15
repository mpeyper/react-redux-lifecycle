import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'

import { withLifecycleActions } from '../src/withLifecycleActions'

const TestComponent = ({ message }) => <p>{message}</p>
const ErrorComponent = () => {
  throw Error('expected')
}
const testAction = method => ({ type: `TEST_ACTION_${method}` })

const updater = (message1, message2) => Component => {
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

const suppressError = f => {
  const error = console.error
  try {
    console.error = () => {}
    return f()
  } finally {
    console.error = error
  }
}

describe('withLifecycleActions Tests', () => {
  test('should dispatch action on componentWillMount', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({
      componentWillMount: testAction('componentWillMount')
    })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual('<p>expected</p>')
    expect(mockStore.getActions()).toEqual([testAction('componentWillMount')])
  })

  test('should dispatch action on componentDidMount', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({
      componentDidMount: testAction('componentDidMount')
    })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent message="expected" />
      </Provider>
    )

    expect(testComponent.html()).toEqual('<p>expected</p>')
    expect(mockStore.getActions()).toEqual([testAction('componentDidMount')])
  })

  test('should dispatch action on componentWillReceiveProps', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = updater('wrong', 'expected')(
      withLifecycleActions({
        componentWillReceiveProps: testAction('componentWillReceiveProps')
      })(TestComponent)
    )

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(testComponent.html()).toEqual('<p>expected</p>')
    expect(mockStore.getActions()).toEqual([testAction('componentWillReceiveProps')])
  })

  test('should dispatch action on componentWillUpdate', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = updater('wrong', 'expected')(
      withLifecycleActions({
        componentWillUpdate: testAction('componentWillUpdate')
      })(TestComponent)
    )

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(testComponent.html()).toEqual('<p>expected</p>')
    expect(mockStore.getActions()).toEqual([testAction('componentWillUpdate')])
  })

  test('should dispatch action on componentDidUpdate', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = updater('wrong', 'expected')(
      withLifecycleActions({
        componentDidUpdate: testAction('componentDidUpdate')
      })(TestComponent)
    )

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    expect(testComponent.html()).toEqual('<p>expected</p>')
    expect(mockStore.getActions()).toEqual([testAction('componentDidUpdate')])
  })

  test('should dispatch action on componentWillUnmount', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({
      componentWillUnmount: testAction('componentWillUnmount')
    })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    testComponent.unmount()

    expect(mockStore.getActions()).toEqual([testAction('componentWillUnmount')])
  })

  test('should dispatch action on componentDidCatch', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({
      componentDidCatch: testAction('componentDidCatch')
    })(ErrorComponent)

    suppressError(() =>
      mount(
        <Provider store={mockStore}>
          <WrappedComponent />
        </Provider>
      )
    )

    expect(mockStore.getActions()).toEqual([testAction('componentDidCatch')])
  })

  test('should dispatch action on multiple lifecycle methods', () => {
    let mockStore = configureStore()({})

    let WrappedComponent = withLifecycleActions({
      componentWillMount: testAction('componentWillMount'),
      componentWillUnmount: testAction('componentWillUnmount')
    })(TestComponent)

    let testComponent = mount(
      <Provider store={mockStore}>
        <WrappedComponent />
      </Provider>
    )

    testComponent.unmount()

    expect(mockStore.getActions()).toEqual([testAction('componentWillMount'), testAction('componentWillUnmount')])
  })

  test('should warn about unknown key', () => {
    const warnFunction = console.warn

    try {
      console.warn = jest.fn()

      let mockStore = configureStore()({})

      let WrappedComponent = withLifecycleActions({
        render: testAction('render')
      })(TestComponent)

      let testComponent = mount(
        <Provider store={mockStore}>
          <WrappedComponent message="expected" />
        </Provider>
      )

      expect(testComponent.html()).toEqual('<p>expected</p>')
      expect(mockStore.getActions()).toEqual([])
      expect(console.warn).toBeCalledWith(
        'Unknown key(s) (render) found in lifecycleActions.  ' +
          'Allowed keys are componentWillMount, componentDidMount, componentWillReceiveProps, ' +
          'componentWillUpdate, componentDidUpdate, componentWillUnmount, componentDidCatch.'
      )
    } finally {
      console.warn = warnFunction
    }
  })

  test('should not warn about unknown key in production', () => {
    const nodeEnv = process.env.NODE_ENV
    const warnFunction = console.warn

    try {
      process.env.NODE_ENV = 'production'
      console.warn = jest.fn()

      let mockStore = configureStore()({})

      let WrappedComponent = withLifecycleActions({
        render: testAction('render')
      })(TestComponent)

      let testComponent = mount(
        <Provider store={mockStore}>
          <WrappedComponent message="expected" />
        </Provider>
      )

      expect(testComponent.html()).toEqual('<p>expected</p>')
      expect(mockStore.getActions()).toEqual([])
      expect(console.warn).toHaveBeenCalledTimes(0)
    } finally {
      process.env.NODE_ENV = nodeEnv
      console.warn = warnFunction
    }
  })

  test('should raise error if invalid shape provided for lifecycle actions', () => {
    expect(() => withLifecycleActions()).toThrowError(TypeError, 'lifecycleActions must be an object.')
    expect(() => withLifecycleActions(123)).toThrowError(TypeError, 'lifecycleActions must be an object.')
    expect(() => withLifecycleActions('wrong')).toThrowError(TypeError, 'lifecycleActions must be an object.')
    expect(() => withLifecycleActions(['componentWillMount'])).toThrowError(TypeError, 'lifecycleActions must be an object.')
  })

  test('should not raise error if invalid shape provided for lifecycle actions if in production', () => {
    const nodeEnv = process.env.NODE_ENV

    try {
      process.env.NODE_ENV = 'production'

      expect(typeof withLifecycleActions()).toEqual('function')
      expect(typeof withLifecycleActions(123)).toEqual('function')
      expect(typeof withLifecycleActions('wrong')).toEqual('function')
      expect(typeof withLifecycleActions(['componentWillMount'])).toEqual('function')
    } finally {
      process.env.NODE_ENV = nodeEnv
    }
  })
})
