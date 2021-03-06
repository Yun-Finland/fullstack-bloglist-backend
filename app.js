const config = require('./utils/config')
const express = require('express')
const app = express()
const cors=require('cors')

const mongoose = require('mongoose')

const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')
const middleware = require('./utils/middleware')

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors)
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.get('/', (request, response)=>{
  response.send('<h1>This is a bloglist backend</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app