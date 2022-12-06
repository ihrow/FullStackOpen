import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button, Modal, Text, Spacer } from '@nextui-org/react'
import signupService from "../services/signup"
import loginService from "../services/login"
import blogService from '../services/blogs'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(true)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const closeHandler = () => {
    setVisible(false)
    navigate('/')
  }

  const handleSignUp = async (event) => {
    setUsername('')
    setPassword('')
    setName('')
    try {
        await signupService.signup({ username, password, name })
        navigate('/login')
    } catch (exeption) {
        console.log(exeption)
        setMessage('Username already taken')
    }
  }

  return (
    <div>
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header> 
          <Text h3>Sign Up</Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSignUp} >
              <Input size="lg" fullWidth aria-labelledby="username" bordered placeholder="Username" type="text" value={username} name="Username" onChange={({ target }) => {
                setUsername(target.value)
                setName(target.value)
              }} />
              <Spacer y={0.5} />
              <Input.Password size="lg" fullWidth aria-labelledby="password" bordered placeholder="Password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
              <Spacer y={0.5} />
              <Text small>{message}</Text>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto color={"error"} onClick={closeHandler}>Close</Button>
          <Button auto type="submit" color={"success"} onClick={handleSignUp}>Sign Up</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SignUp
