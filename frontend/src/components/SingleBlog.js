// @flow

import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { Redirect } from 'react-router'
import { Loader } from 'semantic-ui-react'

class SingleBlog extends React.Component {
  like = () => async () => {
    console.log('like: ',this.props.blog)
    this.props.likeBlog(this.props.blog)
    this.props.notify(`blog ${this.props.blog.title} liked`, 5000)
  }

  remove = () => async (history) => {
    console.log('remove: ',this.props.blog)
    this.props.removeBlog(this.props.blog)
    this.props.notify(`blog ${this.props.blog.title} removed`, 5000)
  }

  comment = (e) =>  {
    e.preventDefault()
    const comment =  e.target.comment.value
    console.log('comment: ',comment)
    e.target.comment.value = ''
    this.props.commentBlog(this.props.blog, comment)
    this.props.notify(`Comment added: ${comment}`, 5000)
  }

  render() {
    const { blog, blogs, login } = this.props
    console.log('blogs: ', blogs)
    console.log('blog: ', blog)



    if (blogs.length===0) {
      return (
        <div>
          <Loader active inline='centered'>Loading</Loader>
        </div>
      )
    }

    if (blogs.length !==0 && blog===undefined )
      return(
        <Redirect to="/" />
      )

    const adder = blog.user ? blog.user.name : 'anonymous'
    const deletable = blog.user === undefined || blog.user.username === login.username

    return (
      <div>
        <h1>{blog.title} </h1>
        <div>
          {blog.author}
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={this.like()}>like</button>
        </div>
        <div>
            added by {adder}
        </div>
        <div>
          {deletable && <div><button onClick={this.remove()}>delete</button></div>}
        </div>
        <div>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((comment, i) =>
              <li key={i}>
                {comment}
              </li>
            )}
          </ul>
          <form onSubmit={this.comment}>
            <div>
              <input
                name='comment'
              />
            </div>
            <button type="submit">Add comment</button>
          </form>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog._id === ownProps.blogID),
    blogs: state.blogs,
    login: state.login
  }
}


export default connect(mapStateToProps, { likeBlog, removeBlog, commentBlog, notify })(SingleBlog)