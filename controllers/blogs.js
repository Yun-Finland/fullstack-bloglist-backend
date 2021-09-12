const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs from the database
blogsRouter.get('/', async (request, response) =>{
  const returnedBlogs = await Blog.find({})    
  response.json(returnedBlogs)
})

// Find a blog by id
blogsRouter.get('/:id', async (request, response)=> {
  const blog = await Blog.findById(request.params.id)
    
  if(blog){
    response.json(blog.toJSON())
  }else{
    response.status(404).send({error:'Cannot find by blog'})
  }   
})

// Add a new blog
blogsRouter.post('/', async (request, response)=>{
  const body = request.body

  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await newBlog.save()

  response.json(savedBlog.toJSON())

})

// Update an existing blog
blogsRouter.put('/:id', async (request, response)=>{
  const body = request.body

  const updatedBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new:true })
    
  response.json(returnedBlog.toJSON())
})

// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

/* Below are the examples with promise chain
// Get all blogs from the database
blogsRouter.get('/', (request, response) =>{
  Blog
    .find({})
    .then(blogs => {
      response.json(returnedBlogs.map(blog => blog.toJSON()))
    })  
})

// Find a blog by id
blogsRouter.get('/:id', (request, response, next)=> {
  Blog.findById(request.params.id)
    .then(blog => {
      if(blog){
        response.json(blog.toJSON())
      }else{
        response.status(404).send({error:'Cannot find by blog'})
      }
    })
    .catch(error => next(error))
})

// Add a new blog
blogsRouter.post('/', (request, response, next)=>{
  const body = request.body

  const newBlog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0
  })

  newBlog.save()
    .then(savedBlog => {
      response.json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})

// Update an existing blog
blogsRouter.put('/:id', (request, response, next)=>{
  const body = request.body

  const updatedBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new:true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

// Delete a blog
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

module.exports = blogsRouter

*/
