// @flow

import React from 'react'
import { connect } from 'react-redux'
import UserListRow from './UserListRow'
import { Table } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react'

class UserList extends React.Component {



  render(){
    const users = this.props.users
    console.log('users: ',users)
    if (users.length===0) {
      return (
        <div>
          <h2>Users</h2>
          <Loader active inline='centered'>Loading</Loader>
        </div>
      )
    }

    return (
      <div>
        <h2>Users</h2>
        <Table striped celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell>User</Table.Cell>
              <Table.Cell>Number of blogs</Table.Cell>
            </Table.Row>
            {users.map(user =>
              <UserListRow
                user = {user}
                key={user._id}
              />
            )}
          </Table.Body>
        </Table>
      </div>
    )}
}
//const byBlogs = (b1, b2) => b2.blogs.length() - b1.blogs.length()

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}



export default connect(mapStateToProps)(UserList)