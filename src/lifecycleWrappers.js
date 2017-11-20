import { withLifecycleActions, INCLUDED_METHODS } from './withLifecycleActions'

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

INCLUDED_METHODS.forEach(
  method =>
    (module.exports[`on${capitalizeFirstLetter(method)}`] = action => withLifecycleActions({ [method]: action }))
)
