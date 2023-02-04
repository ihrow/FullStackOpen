import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Input, Spacer, Container } from '@nextui-org/react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch (exeption) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  return (
    <Container>
      <form className="login-form" onSubmit={handleLogin}>
      <Spacer y={0.5} />

        <div className="login-username">
          <Input fullWidth aria-labelledby="input-login" clearable underlined labelLeft="Username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <Spacer y={0.5} />

        <div>
          <Input.Password fullWidth aria-labelledby="input-password" clearable underlined labelLeft="Password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <Spacer y={1} />
        <Button type="submit" color={"gradient"}>Login</Button>
      </form>
    </Container>
  )
}

export default LoginForm
