const config = require('./utils/config')
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')
const middleware = require('./utils/middleware')

const url = config.MONGODB_URI
logger.info('connecting to ', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.get('/', (request, response)=>{
  response.send('<h1>This is a bloglist backend</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, ()=>{
  logger.info(`Listen to the PORT ${config.PORT}`)
})