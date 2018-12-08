// @flow

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

class SingleUser extends React.Component {

  render() {

    const { user, users, blogs } = this.props
    console.log('users: ', users)
    console.log('single user: ', user)
    if (users.length===0) {
      return (
        <div>
          <Loader active inline='centered'>Loading</Loader>
        </div>
      )
    }
    const Usersblogs = blogs.filter(blog => blog.user.username === user.username)
    console.log('Usersblogs: ',Usersblogs)
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>Blogs added by this user</h3>
        <list>
          {Usersblogs.map(blog =>
            <li key={blog._id}>
              <NavLink exact to={`/blogs/${blog._id}`} >
                {blog.title}
              </NavLink>
            </li>
          )}
        </list>

      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user._id === ownProps.userID),
    users: state.users,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps)(SingleUser)