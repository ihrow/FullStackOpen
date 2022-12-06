import { useState } from "react"
import blogService from "../services/blogs"
import { Button, Input } from '@nextui-org/react'


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
      <form onSubmit={handleCreateBlog} >
        <div>
            <Input className="new-blog-input" aria-labelledby="title" underlined labelLeft="Title" type="text" value={newBlog.title} name="Title" onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </div>
        <div>
          <Input className="new-blog-input" aria-labelledby="author" underlined labelLeft="Author" type="text" value={newBlog.author} name="Author" onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </div>
        <div>
          <Input className="new-blog-input" aria-labelledby="url" underlined labelLeft="https://" type="text" value={newBlog.url} name="Url" onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </div>
        <Button type="submit" bordered color="primary">Post</Button>
      </form>
    </div>
  )
}

export default BlogForm
