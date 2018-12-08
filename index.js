const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')

const extractToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}





morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))



app.use(extractToken)
app.use(cors())
app.use(bodyParser.json())


mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise


app.use(express.static('build'))
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)

const server = http.createServer(app)

server.listen(config.port || 3001)

/*
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
*/

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}