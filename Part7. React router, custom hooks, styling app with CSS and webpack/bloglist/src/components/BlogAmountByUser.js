import { Table, Text } from "@nextui-org/react";
import { Link } from "react-router-dom";


const BlogAmountByUser = (props) => {
  const usersFromBlogs = props.blogs.map((blog) => blog.user)
  const uniqueUsersSet = new Set(usersFromBlogs.map((user) => user.username))
  const uniqueUsers = [...uniqueUsersSet]


  if(uniqueUsers.length === 0) {
    return null
  }

  console.log(uniqueUsers.length === 0)

  return (
  <Table bordered shadow={false} color={"secondary"}>
    <Table.Header>
      <Table.Column>
        <Text color='success' b size={22}>
          User
        </Text>
      </Table.Column>
      <Table.Column>
        <Text color='success' b size={22}>
          Blogs created
        </Text>
      </Table.Column>
    </Table.Header>
    <Table.Body>
      {uniqueUsers.map((user) => (
        <Table.Row key={user}>
          <Table.Cell>
            <Text color='error' b size={22} css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}>
              <Link to={`/users/${user}`}>{user}</Link>
            </Text>
          </Table.Cell>
          <Table.Cell>
          <Text color='error' b size={22} css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}>
            {usersFromBlogs.filter((blog) => blog.username === user).length}
            </Text>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Pagination shadow noMargin align="center" rowsPerPage={5} />
  </Table>
  )
}

export default BlogAmountByUser
