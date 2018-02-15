import { withLifecycleActions } from './withLifecycleActions'

export const onComponentWillMount = action => withLifecycleActions({ componentWillMount: action })
export const onComponentDidMount = action => withLifecycleActions({ componentDidMount: action })
export const onComponentWillReceiveProps = action => withLifecycleActions({ componentWillReceiveProps: action })
export const onComponentWillUpdate = action => withLifecycleActions({ componentWillUpdate: action })
export const onComponentDidUpdate = action => withLifecycleActions({ componentDidUpdate: action })
export const onComponentWillUnmount = action => withLifecycleActions({ componentWillUnmount: action })
export const onComponentDidCatch = action => withLifecycleActions({ componentDidCatch: action })
