import React from 'react'
import { connect } from 'react-redux'

const EXCLUDED_MEMBERS = [
  'constructor',
  'render',
  'shouldComponentUpdate',
  'setState',
  'forceUpdate',
  'props',
  'state',
  'context',
  'refs',
  'displayName',
  'defaultProps'
]

const withLifecycleActions = (lifecycleActions) => {

  if (process.env.NODE_ENV !== 'production') {
      console.assert(typeof lifecycleActions === 'object' && !Array.isArray(lifecycleActions), 'lifecycleActions must be an object.')
  }

  return (Component) => {
    class LifeCycleActionsWrapper extends React.PureComponent {
      constructor() {
        super()

        Object.keys(lifecycleActions)
          .filter((lifecycleActionKey) => EXCLUDED_MEMBERS.indexOf(lifecycleActionKey) < 0)
          .forEach((lifecycleActionKey) => {
            this[lifecycleActionKey] = () => this.props.dispatch(lifecycleActions[lifecycleActionKey])
          })
      }

      render() {
        return <Component {...this.props} />
      }
    }

    return connect()(LifeCycleActionsWrapper)
  }
}

export default withLifecycleActions
