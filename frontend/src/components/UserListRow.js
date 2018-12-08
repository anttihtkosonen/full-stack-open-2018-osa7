// @flow

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class UserListRow extends React.Component {

  render() {
    const { user, blogs } = this.props
    console.log('user listed: ',user.name)
    const Usersblogs = blogs.filter(blog => blog.user.username === user.username)
    return (
      <Table.Row>
        <Table.Cell>
          <NavLink  exact to={`/users/${user._id}`} >{user.name}</NavLink>
        </Table.Cell>
        <Table.Cell>
          {Usersblogs.length}
        </Table.Cell>
      </Table.Row>
    )
  }
}




const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { })(UserListRow)