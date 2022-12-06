import { useNavigate } from 'react-router-dom'
import { Grid, Button, Spacer, Text } from '@nextui-org/react'

const Logout = ({ setUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/login')
  }

  return (
    <div>
        <Spacer x={1} />
        <Text css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
          ml: 17,
        }} h3>Are you sure?</Text>

        <Spacer y={1} />
        <Grid.Container justify="center">

        <Grid xs={12}>
        <Button auto onClick={handleLogout} color={"gradient"}>Logout</Button>
        <Spacer x={0.5} />
        <Button auto onClick={() => navigate('/blogs')} color={"gradient"}>Cancel</Button>
        </Grid>
        </Grid.Container>
    </div>
  )
}

export default Logout
