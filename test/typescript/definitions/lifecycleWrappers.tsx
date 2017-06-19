import * as React from 'react'
import { withLifecycleActions } from '../../../src'
import { 
    onComponentWillMount, 
    onComponentDidMount, 
    onComponentWillReceiveProps,
    onComponentWillUpdate,
    onComponentDidUpdate,
    onComponentWillUnmount
} from '../../../src'

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

const WrappedComponent1 = onComponentWillMount(exampleAction)(Component)
const WrappedComponent2 = onComponentDidMount(exampleAction)(Component)
const WrappedComponent3 = onComponentWillReceiveProps(exampleAction)(Component)
const WrappedComponent4 = onComponentWillUpdate(exampleAction)(Component)
const WrappedComponent5 = onComponentDidUpdate(exampleAction)(Component)
const WrappedComponent6 = onComponentWillUnmount(exampleAction)(Component)

const TestComponent = () => (
    <div>
        <WrappedComponent1 />
        <WrappedComponent2 />
        <WrappedComponent3 />
        <WrappedComponent4 />
        <WrappedComponent5 />
        <WrappedComponent6 />
    </div>
)
