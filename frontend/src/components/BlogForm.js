// @flow
import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'semantic-ui-react'

class BlogForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()

    const blogObj = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''

    this.props.createBlog(blogObj)
    this.props.notify(`Blog ${blogObj.title} created`, 5000)

  }

  render(){
    const headingStyle = {
      paddingTop: 10,
      paddingBottom: 10,
    }
    return (
      <div>
        <h2 style = {headingStyle}>Create a new blog</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input input name='title' placeholder='Blog title'/>
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input name='author' placeholder='Blog author' />
          </Form.Field>
          <Form.Field>
            <label>Url</label>
            <input input name='url' placeholder='Blog address'/>
          </Form.Field>

          <Button type="submit">Submit</Button>

        </Form>
      </div>
    )
  }
}


export default connect(null, { createBlog, notify })(BlogForm)