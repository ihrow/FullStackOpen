const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.JWT_KEY)
  if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

const errorHandler = (error, request, response, next) => {

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

module.exports = { tokenExtractor, errorHandler, userExtractor }
