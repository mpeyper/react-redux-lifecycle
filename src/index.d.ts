import * as React from 'react';
import * as Redux from 'redux';

interface LifecycleActions {
    componentWillMount? : Redux.Action
}

interface ComponentDecorator {
    <TProps, TComponentConstruct extends (React.ComponentClass<TProps> | React.StatelessComponent<TProps>)>(component: TComponentConstruct): TComponentConstruct;
}

export function withLifecycleActions(lifecycleActions: LifecycleActions): ComponentDecorator

export default withLifecycleActions