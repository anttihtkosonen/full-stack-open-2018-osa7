// @flow

import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

class LoginForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const username = e.target.username.value
      const password = e.target.password.value
      e.target.username.value = ''
      e.target.password.value = ''
      console.log('username: ',username)
      this.props.login(username, password)
      this.props.notify('Welcome Back', 5000)
    } catch (exception) {
      this.notify('Username or password is invalid', 3000)
    }
  }


  render(){
    return (
      <div>
        <h2>Log in to blog app</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Username
            <input
              name="username"
            />
          </div>
          <div>
              Password
            <input
              name="password"
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    )
  }

}


export default connect(null, { notify, login })(LoginForm)