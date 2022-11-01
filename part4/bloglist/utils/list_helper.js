const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((favorite, blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
    return favorite
  }, blogs[0])
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = blogs.map((blog) => blog.author)
  const uniqueAuthors = [...new Set(authors)]
  const blogsAmountByAuthor = uniqueAuthors.map((author) => {
    return {
      author: author,
      blogs: blogs.filter((blog) => blog.author === author).length,
    }
  })
  return blogsAmountByAuthor.reduce((mostBlogs, author) => {
    if (author.blogs > mostBlogs.blogs) mostBlogs = author
    return mostBlogs
  }, blogsAmountByAuthor[0])
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = blogs.map((blog) => blog.author)
  const uniqueAuthors = [...new Set(authors)]
  const likesAmountByAuthor = uniqueAuthors.map((author) => {
    return {
      author: author,
      likes: blogs.reduce((totalLikes, blog) => {
        if (blog.author === author) totalLikes += blog.likes
        return totalLikes
      }, 0),
    }
  })
  return likesAmountByAuthor.reduce((mostLikes, author) => {
    if (author.likes > mostLikes.likes) mostLikes = author
    return mostLikes
  }, likesAmountByAuthor[0])
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }
