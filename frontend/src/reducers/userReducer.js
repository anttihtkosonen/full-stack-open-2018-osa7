import users from '../services/users'

const reducer = (store = [], action) => {
  if (action.type === 'CREATE_USER') {
    console.log(action.content)
    return store.concat(action.content)
  }
  if (action.type === 'INITIALIZE_USERS') {
    return store = action.content
  }
  console.log('users requested from store')
  return store
}




export const createUser = (username, name, password, adult) => {
    return async (dispatch) => {
      const userObj = {
        username: username,
        name: name,
        password: password,
        adult: adult
      }
      const user = await users.create(userObj)
      dispatch({
        type: 'CREATE_USER',
        content: user
      })
    }
  }

export const initializeUsers = () => {
    return async (dispatch) => {
      const initialUsers = await users.getAll()
      console.log('initialized users: ',initialUsers)
      dispatch({
        type: 'INITIALIZE_USERS',
        content: initialUsers
      })
    }
  }


export default reducer