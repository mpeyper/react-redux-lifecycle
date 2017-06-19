
const handleAction = (action, dispatch, props) => {
  if (typeof action === 'function') {
      dispatch(action(props))
  } else if (Array.isArray(action)) {
      action.forEach(a => handleAction(a, dispatch, props))
  } else {
      dispatch(action)
  }
}

export default handleAction
