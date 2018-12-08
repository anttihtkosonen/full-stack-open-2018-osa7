import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (store = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.content
  case 'LOGOUT':
    return null
  default:
    return store
  }
}
export const readLoginState = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log('loggedUserJSON: ',loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      console.log('login dispatched')
      dispatch({
        type: 'LOGIN',
        content: user
      })
    }
  }
}

export const login = ( username, password ) => {
  return async (dispatch) => {
      const loggedUser = await loginService.login({
        username: username,
        password: password
      })
      console.log('loggedUser: ',loggedUser)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN',
        content: loggedUser
      })
  }
}

export const logout = () => {
  console.log('logout')
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT',
      content: null
    })
  }
}

export default loginReducer