// @flow
import React from 'react'
import { connect } from 'react-redux'
import BlogListRow from './BlogListRow'
import { Loader } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'

class BlogList extends React.Component {

  render(){
    const blogs = this.props.blogs
    console.log('blogs: ',blogs)

    const headingStyle = {
      paddingTop: 10,
      paddingBottom: 10,
    }

    if (blogs.length===0) {
      return (
        <div>
          <h2 style={headingStyle}>Blogs</h2>
          <Loader active inline='centered'>Loading</Loader>
        </div>
      )
    }

    return (
      <div>
        <h2 style={headingStyle}>Blogs</h2>
        <List divided relaxed>
          {blogs.map(blog =>
            <BlogListRow
              blogID = {blog._id}
              key={blog._id}
            />
          )}
        </List>
      </div>
    )}
}

const byLikes = (b1, b2) => b2.likes - b1.likes


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort(byLikes)
  }
}



export default connect(mapStateToProps, {} )(BlogList)