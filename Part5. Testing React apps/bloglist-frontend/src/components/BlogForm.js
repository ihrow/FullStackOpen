import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ user, setMessage, setBlogs, blogs, blogFormClose }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const handleCreateBlog = async (event) => {
    blogFormClose()
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user: user.id,
    }

    const returnedBlog = await blogService.create(blogObject)
    setMessage(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    )

    setTimeout(() => {
      setMessage(null)
    }, 2000)

    setBlogs(blogs.concat({ ...returnedBlog, user: user }))

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Post New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default BlogForm
