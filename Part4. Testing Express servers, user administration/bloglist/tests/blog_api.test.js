const supertest = require('supertest')
const app = require('../index')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const keys = Object.keys(response.body[0])
    expect(keys.filter(key => key === 'id')).toHaveLength(1)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://test.com",
        likes: 0
    }

    await api 
    .post('/api/blogs')
    .set('Authorization', `bearer ${process.env.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: "Test Like Blog",
        author: "Test Author",
        url: "http://test.com"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const testBlog = response.body.filter(blog => blog.title === 'Test Like Blog')[0]
    expect(testBlog.likes).toBe(0)
})

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
    const newBlog = {
        title: "Test URL Blog",
        author: "Test Author",
        likes: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${process.env.token}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    const updatedBlog = {
        title: "Updated Blog",
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0].title).toBe('Updated Blog')
})