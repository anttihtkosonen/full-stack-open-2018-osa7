// @flow
import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class BlogListRow extends React.Component {


  render() {
    const { blog } = this.props
    return (
      <List.Item>
        <List.Icon name='quote right' size='large' verticalAlign='middle' />
        <List.Content>
          <List.Header><NavLink  exact to={`/blogs/${blog._id}`} >{blog.title}</NavLink></List.Header>
          <List.Description>by {blog.author}</List.Description>
        </List.Content>
      </List.Item>

    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(i => i._id === ownProps.blogID)
  }
}



export default connect(mapStateToProps)(BlogListRow)