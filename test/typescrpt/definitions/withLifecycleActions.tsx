import * as React from 'react'
import withLifecycleActions from '../../../src'

const exampleAction = { type: "TEST" }

const lifeCycleActions = {
  componentWillMount: exampleAction
}

const Component = () => <div>Test</div>

const WrappedComponent = withLifecycleActions(lifeCycleActions)(Component)

const TestComponent = () => <WrappedComponent />