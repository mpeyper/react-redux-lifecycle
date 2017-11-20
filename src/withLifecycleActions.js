import React from 'react'
import { connect } from 'react-redux'
import handleAction from './handleAction'

export const INCLUDED_METHODS = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'componentDidCatch'
]

export const withLifecycleActions = lifecycleActions => {
  if (process.env.NODE_ENV !== 'production') {
    console.assert(
      typeof lifecycleActions === 'object' && !Array.isArray(lifecycleActions),
      'lifecycleActions must be an object.'
    )
  }

  const lifecycleActionsKeys = Object.keys(lifecycleActions || {})

  if (process.env.NODE_ENV !== 'production') {
    const unknownKeys = lifecycleActionsKeys.filter(
      lifecycleActionKey => INCLUDED_METHODS.indexOf(lifecycleActionKey) < 0
    )

    if (lifecycleActionsKeys.length > 0 && unknownKeys.length > 0) {
      const unknownKeysString = unknownKeys.join(', ')
      const allowedKeysString = INCLUDED_METHODS.join(', ')
      console.warn(
        `Unknown key(s) (${unknownKeysString}) found in lifecycleActions.  Allowed keys are ${allowedKeysString}.`
      )
    }
  }

  return Component => {
    class LifeCycleActionsWrapper extends React.Component {
      constructor() {
        super()

        lifecycleActionsKeys
          .filter(lifecycleActionKey => INCLUDED_METHODS.indexOf(lifecycleActionKey) >= 0)
          .forEach(
            lifecycleActionKey =>
              (this[lifecycleActionKey] = () =>
                handleAction(lifecycleActions[lifecycleActionKey], this.props.dispatch, this.getPassThroughProps()))
          )
      }

      getPassThroughProps() {
        const { dispatch, ...passThroughProps } = this.props // eslint-disable-line no-unused-vars
        return passThroughProps
      }

      render() {
        return <Component {...this.getPassThroughProps()} />
      }
    }

    return connect()(LifeCycleActionsWrapper)
  }
}
