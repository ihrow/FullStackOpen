import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const likeAnecdote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const anecdote = response.data
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response2 = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response2.data
}



const anecdoteService = { getAll, createNew, likeAnecdote }
export default anecdoteService