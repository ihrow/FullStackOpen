import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`




const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)
  if (authors.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const changeBornYear = async (event) => {
    event.preventDefault()
    console.log('changeBornYear')
    console.log(year)
    editAuthor({  variables: { name, setBornTo: Number(year) }  })
    setName('')
    setYear('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Change birth year</h1>
      <form onSubmit={changeBornYear}>
        <div>
          <Select defaultValue={name} onChange={({value}) => setName(value)} options={authors.data.allAuthors.map(a => ({ value: a.name, label: a.name }))} />
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
          <button type='submit'>update author</button>
          </div>
        </form>
    </div>
  )
}

export default Authors
