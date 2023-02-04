import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((a) => a.id === id)
      anecdoteToVote.votes++
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    await anecdoteService.likeAnecdote(id)
    dispatch(voteAnecdote(id))
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
  }
}

export default anecdoteSlice.reducer
