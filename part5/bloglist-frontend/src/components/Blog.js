import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const index = blogs.findIndex((blogToFind) => blogToFind.id === blog.id)
      blogService.remove(blog.id)
      blogs.splice(index, 1)
      setBlogs(blogs.map((allBlogs) => allBlogs))
    }
  }

  const handleClickButton = () => {
    const addLikeBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    blogService.update(blog.id, addLikeBlog)
    blog.likes += 1
    setBlogs(blogs.map((allBlogs) => allBlogs))
  }

  const handleViewClick = () => {
    setView(!view)
  }

  return (
    view ? (
      <div style={blogStyle}>
        {blog.title} <br /> 
        {blog.url} <br />
        likes {blog.likes} <button onClick={handleClickButton}>like</button> <br /> 
        {blog.author}
        <button onClick={handleViewClick}>hide</button>{' '}
        <button onClick={handleRemoveClick}>delete</button>
      </div>
    ) : (
      <div>
        {blog.title} by {blog.author}{' '}
        <button onClick={handleViewClick}>view</button>{' '}
        <button onClick={handleRemoveClick}>delete</button>
      </div>
    )
  )
}

export default Blog
