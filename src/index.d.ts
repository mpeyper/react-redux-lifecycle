import * as React from 'react';
import * as Redux from 'redux';

type Actionable = Redux.Action | Redux.ActionCreator<any>

interface LifecycleActions {
    componentWillMount?: Actionable | Array<Actionable>,
    componentDidMount?: Actionable | Array<Actionable>,
    componentWillReceiveProps?: Actionable | Array<Actionable>,
    componentWillUpdate?: Actionable | Array<Actionable>,
    componentDidUpdate?: Actionable | Array<Actionable>,
    componentWillUnmount?: Actionable | Array<Actionable>
}

interface ComponentDecorator {
    <TProps, TComponentConstruct extends (React.ComponentClass<TProps> | React.StatelessComponent<TProps>)>(component: TComponentConstruct): TComponentConstruct;
}

export function withLifecycleActions(lifecycleActions: LifecycleActions): ComponentDecorator

export function onComponentWillMount(action: Actionable): ComponentDecorator
export function onComponentDidMount(action: Actionable): ComponentDecorator
export function onComponentWillReceiveProps(action: Actionable): ComponentDecorator
export function onComponentWillUpdate(action: Actionable): ComponentDecorator
export function onComponentDidUpdate(action: Actionable): ComponentDecorator
export function onComponentWillUnmount(action: Actionable): ComponentDecorator
