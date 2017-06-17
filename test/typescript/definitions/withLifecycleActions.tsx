import * as React from 'react'
import withLifecycleActions from '../../../src'

const exampleAction = { type: "TEST" }

const lifeCycleActions = {
    componentWillMount: exampleAction,
    componentDidMount: () => exampleAction,
    componentWillReceiveProps: [exampleAction],
    componentWillUpdate: [exampleAction, exampleAction],
    componentDidUpdate: [() => exampleAction, () => exampleAction],
    componentWillUnmount: [exampleAction, () => exampleAction]
}

const Component = () => <div>Test</div>

const WrappedComponent = withLifecycleActions(lifeCycleActions)(Component)

const TestComponent = () => <WrappedComponent />