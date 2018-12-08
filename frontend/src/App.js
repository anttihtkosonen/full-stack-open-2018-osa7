import React from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import SingleBlog from './components/SingleBlog'
import SingleUser from './components/SingleUser'
import UserList from './components/UserList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { readLoginState, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'


class App extends React.Component {

  componentDidMount() {
    this.props.readLoginState()
    this.props.initializeUsers()
    this.props.initializeBlogs()
  }



  render() {
    console.log('this.props.login: ',this.props.login)
    if (this.props.login === null || this.props.login === undefined) {

      return (
        <div>
          <Notification store={this.props.store} />
          <LoginForm />
        </div>
      )
    }

    return (
      <Container>
        <Router>
          <div>
            <Notification store={this.props.store} />
            <Menu store={this.props.store} />

            <Togglable buttonLabel='New blog'>
              <BlogForm store={this.props.store} />
            </Togglable>
            <Route exact path='/' render={() => <BlogList store={this.props.store} /> } />
            <Route exact path="/blogs/:id" render={({ match }) => <SingleBlog blogID={(match.params.id)} store={this.props.store} /> } />
            <Route exact path='/users' render={() => <UserList store={this.props.store}/> } />
            <Route exact path="/users/:id" render={({ match }) => <SingleUser store={this.props.store} userID={(match.params.id)} /> } />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps, { notify, initializeUsers, initializeBlogs, readLoginState, logout })(App)
