const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { createCustomError, errorRoute } = require('../errors/custom-error')
dotenv.config()

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createCustomError(2000, errorRoute.Enum.general))
    }
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (
        (req.baseUrl === '/api/v1/jeweler/admin')
      ) {
        req.user = decoded
        next()
      }
      else {
        return next(createCustomError(2000, errorRoute.Enum.general))
      }
    } catch (error) {
      return next(createCustomError(2000, errorRoute.Enum.general))
    }
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = { authMiddleware }
