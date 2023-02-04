import { useRef, useEffect } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import BlogsList from './BlogsList'
import { Text } from '@nextui-org/react'

const BlogsDisplay = (props) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => props.setBlogs(blogs))
  })

  const blogFormRef = useRef()


  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <BlogForm
        user={props.user}
        setMessage={props.setMessage}
        setBlogs={props.setBlogs}
        blogs={props.blogs}
        blogFormClose={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  )

  return (
    <div>
            <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
      >
        Blogs
      </Text>
      {props.blogs
        .filter((blog) => blog.user.username === props.user.username)
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogsList
            key={blog.id}
            blog={blog}
            blogs={props.blogs}
            setBlogs={props.setBlogs}
          />
        ))}
      {blogForm()}
    </div>
  )
}

export default BlogsDisplay
