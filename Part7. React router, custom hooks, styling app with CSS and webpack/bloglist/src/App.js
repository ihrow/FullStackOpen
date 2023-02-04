import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import BlogAmountByUser from './components/BlogAmountByUser'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogsDisplay from './components/BlogsDisplay'
import Blog from './components/Blog'
import Menu from './components/Menu'
import User from './components/User'
import Logout from './components/Logout'
import SignUp from './components/SignUp'
import { NextUIProvider, createTheme, Container, Text } from '@nextui-org/react'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const init = useRef(user ? true : false)

  const darkTheme = createTheme({
    type: 'dark',
  })



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(init.current)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      init.current = true
      console.log('init.current', init.current)
    }
  }, [])

  return (
    <NextUIProvider theme={darkTheme}>
      <Container>
        <Router>
          <Menu user={user} />

          <Routes>
            <Route path="/" element={
                <div>
                  <Text
                    h1
                    size={60}
                    css={{
                      textGradient: '45deg, $blue600 -20%, $pink600 50%',
                    }}
                    weight="bold"
                  >
                    Blog App
                  </Text>
                  <Text
                    h3
                    size={24}
                    css={{
                      textGradient: '45deg, $purple600 -20%, $pink600 100%',
                    }}
                    weight="bold"
                  >
                    made by Igor for the Full Stack Open course
                  </Text>
                </div>
              }
            />
            <Route
              path="/blogs"
              element={
                 init.current === true ? (
                  <BlogsDisplay
                    user={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setMessage={setMessage}
                    setUser={setUser}
                  />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/blogs/:id"
              element={
                init.current === true ? (
                  <Blog blogs={blogs} setBlogs={setBlogs} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/users"
              element={
                init.current === true ? (
                  <BlogAmountByUser blogs={blogs} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/users/:username"
              element={
                init.current === true ? <User blogs={blogs} /> : <Navigate replace to="/login" />
              }
            />
            <Route path="/login" element={<LoginForm setMessage={setMessage} setUser={setUser} />} />
            <Route path="/logout" element={<Logout setUser={setUser} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </Container>
    </NextUIProvider>
  )
}

export default App
