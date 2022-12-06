import { NavLink } from 'react-router-dom'
import { Navbar, Link , Text } from '@nextui-org/react'

const Menu = ({ user }) => {
  return (
    <Navbar isBordered variant={'static'}>
      <Navbar.Content hideIn="xs" activeColor={'secondary'} variant={'highlight-rounded'}>

        <Navbar.Item>
          <Link as={NavLink} to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
            <Text color='error' b size={22}>
              Home
            </Text>
          </Link>
        </Navbar.Item>

        <Navbar.Item>
          <Link as={NavLink} to="/blogs" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
          <Text color='error' b size={22}>
              Blogs
            </Text>
          </Link>
        </Navbar.Item>

        <Navbar.Item>
          <Link as={NavLink} to="/users" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
            <Text color='error' b size={22}>
              Users
            </Text>
          </Link>
        </Navbar.Item>

        {user ? (  

          <Navbar.Item>
            <Link as={NavLink} to="/logout" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
              <Text css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }} color='error' b size={22}>
                Logout
              </Text>

            </Link>
          </Navbar.Item>

        ) : (

          <Navbar.Item>
            <Link
              as={NavLink}
              to="/login"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              <Text css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }} color='error' b size={22}>
                Login
              </Text>
            </Link>
          </Navbar.Item> 
        )}
        
 
      </Navbar.Content>
      <Text h3 size={24} css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"> {user ? (
        <span>
            {user.name} logged in
        </span>
        ) : (
                <Link
                    as={NavLink}
                    to="/signup"
                    className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                >
                    Sign Up
                </Link>
        )}
        </Text>
    </Navbar>
  )
}

export default Menu
