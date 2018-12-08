// @flow

import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class Menu extends React.Component {
  logout = () => {
    this.props.logout()
    this.props.notify('You have logged out', 3000)
  }

  render(){

    const style = {
      fontWeight: 'bold',
      backgroundColor: '#e5efff',
      padding: 20
    }

    const headingStyle = {
      paddingTop: 10,
      paddingBottom: 10,
    }
    return (
      <div>
        <div>
          <h1 style = {headingStyle}>Blog App</h1>
        </div>
        <div style = {style}>
          <span >
            <NavLink exact to="/" >Blogs</NavLink> &nbsp;
            <NavLink to="/users" >Users</NavLink> &nbsp;
          </span>
        </div>
        <div style = {headingStyle}>
          {this.props.login.name} is logged in <Button onClick={logout}>Logout</Button>
        </div>

      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps, { notify, logout })(Menu)
