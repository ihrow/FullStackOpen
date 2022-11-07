import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm setMessage={setMessage} setUser={setUser} />
      </Togglable>
    )
  }

  const blogsDisplay = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>{' '}
      <button onClick={handleLogout}>Logout</button>
      {blogs
        .filter((blog) => blog.user.id === user.id)
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        ))}
      {blogForm()}
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        user={user}
        setMessage={setMessage}
        setBlogs={setBlogs}
        blogs={blogs}
        blogFormClose={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      {user === null ? loginForm() : blogsDisplay()}
      <p>{message}</p>
    </div>
  )
}

export default App
