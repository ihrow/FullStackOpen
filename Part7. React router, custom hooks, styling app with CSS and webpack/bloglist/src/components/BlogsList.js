import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Button, Text, Grid } from '@nextui-org/react'

const BlogList = ({ blog, blogs, setBlogs }) => {
  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const index = blogs.findIndex((blogToFind) => blogToFind.id === blog.id)
      blogService.remove(blog.id)
      blogs.splice(index, 1)
      setBlogs(blogs.map((allBlogs) => allBlogs))
    }
  }

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Link to={`/blogs/${blog.id}`}>
            <Text h3>
              "{blog.title}"
            </Text>
          </Link>
          <Button className='delete-blog' onClick={handleRemoveClick} color="error" auto>
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </div>
  )
}

export default BlogList
