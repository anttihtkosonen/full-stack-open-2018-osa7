const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    comments: [
      "I like this",
      "Yes"
    ]
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    comments: [
      "Not true",
      "Wow"
    ]
  },
]



const initialUsers = [
  {
    name: "Leet Hacker",
    username: "superUser",
    adult: false,
    password: "hunter2",
    blogs: []
  }
]

const filter = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
    comments: blog.comments
  }
}

const blogsInDb = async () => {
  return await Blog.find({})
}

const filterUser = (user) => {
  return {
    name: user.name,
    username: user.username,
    adult: user.adult
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(filterUser)
}

module.exports = {
  filter, blogsInDb, initialBlogs, initialUsers, usersInDb
}