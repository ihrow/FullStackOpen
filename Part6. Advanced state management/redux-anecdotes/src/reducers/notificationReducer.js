const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let timeoutID = null;
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
      timeoutID = null
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification,
    })
    
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: '',
      })
    }, time * 1000)
  }
}

export default notificationReducer
