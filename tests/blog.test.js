const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog.js')

beforeEach(async ()=>{
  
  await Blog.deleteMany({})
  
  for(let blog of helper.initialBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
},100000)

describe('when there are initially some blogs saved', ()=>{
  
  test('blogs are returned as json', async()=>{    
    await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type',/application\/json/)
    console.log('3. step')
  })

  test('all blogs are returned', async()=>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async()=>{
    const response = await api.get('/api/blogs')
    const titles = response.body.map(n=>n.title)

    expect(titles).toContains('React patterns')
  })
})

afterAll(() => {
  mongoose.connection.close()
})

