const reducer = (state = '', action) => {
    switch (action.type) {
    case 'NOTIFY':
      return action.content
    case 'RESET':
      return ''
    default:
      return state
    }
  
  }
  
  export const notify = (content, timeout) => {
    return async (dispatch) => {
      console.log('notify: ', content)
      console.log('timeout: ', timeout)
      dispatch({
        type: 'NOTIFY',
        content
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
          content
        })
      }, timeout)
    }
  }
  
  export default reducer