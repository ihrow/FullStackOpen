import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === Number(id))
    return (
      <div>
        <h3>{anecdote.content}</h3>
        <div><strong>{anecdote.author}</strong></div>
        <div>{anecdote.info}</div>
        <div>Votes: <strong>{anecdote.votes}</strong></div>
      </div>
    )
  }

  export default Anecdote