import { useParams } from 'react-router-dom'
import { useState } from 'react'
import blogService from '../services/blogs'
import { Input, Button, Spacer, Text, Grid } from '@nextui-org/react'

const Blog = ({ blogs, setBlogs }) => {
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const handleClickButton = async () => {
    const addLikeBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      comments: blog.comments,
    }
    blog.likes += 1
    await blogService.update(blog.id, addLikeBlog)
    setBlogs(blogs.map((allBlogs) => allBlogs))
  }

    const handleComment = async (event) => {
        event.preventDefault()
        await blogService.comment(blog.id, comment)
        blog.comments.push(comment)
        setBlogs(blogs.map((allBlogs) => allBlogs))
        setComment('')
    }
    

  return (
    <div>
      <div>
        <Text color='secondary' b size={22}>
          {blog.title} {' '}
        </Text>
        <Text color='primary' b size={22}>
        by {' '}
        </Text>
        <Text color='warning' b size={22}>
          {blog.author}
        </Text>
        </div>
        <Spacer y={1} />

        <a href={`https://${blog.url}`}>
          <Text color='success' b size={22} css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}>
            URL: {blog.url}
          </Text>
        </a>
        <Spacer yHY6GT5B={1} />
        <Grid.Container justify="center">
          <Grid xs={12}>
        <Text color='error' b size={22}>
          {blog.likes} likes
        </Text>
        <Spacer y={0.5} />
        <Button auto color={'success'} onClick={handleClickButton}>Like</Button>
        </Grid>
        </Grid.Container>
      <Spacer y={1} />
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
        <Grid.Container justify="center">

        <Grid xs={12}>
            <Input placeholder='Add a comment' value={comment} onChange={({ target }) => setComment(target.value)} />
            <Spacer y={1} />
            <Button type="submit" auto color={'success'}>Add Comment</Button>
          </Grid>
        </Grid.Container>

        </form>
        <ul>
            {blog.comments.map((comment) => (
                <li key={Math.random()*10000}>{comment}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
