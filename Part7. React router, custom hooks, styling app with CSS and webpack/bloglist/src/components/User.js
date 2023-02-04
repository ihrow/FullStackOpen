import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import blogService from "../services/blogs"
import { Text, Spacer, Button } from '@nextui-org/react'

const User = ({ blogs }) => {
    const username = useParams().username
    const user = blogs.find((n) => n.user.username === username)

    const [userBlogs, setUserBlogs] = useState([])
    useEffect(() => {
        blogService.getAll().then((blogs) => setUserBlogs(blogs.filter((blog) => blog.user.username === username)))
    })

    if (!user) {
        return null
    }

    return (
        <div>
            <Text color='error' b size={22} css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}>
                Blogs added by {user.user.name}
            </Text>
            <ul>
                {userBlogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <Text color='primary' b size={24}>
                                {blog.title}
                            </Text>
                        </Link>
                    </li>
                ))}

            </ul>
            <Button auto onClick={() => window.history.back()} color={"error"}>Back</Button>
        </div>
    )
}

export default User
