require('dotenv').config()
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
  const token = req.headers['x-auth-token']

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)

    req.user = decoded

    next()
  } catch(err) {
    console.error(err.message)
    res.status(401).json({ msg: 'Invalid token' })
  }
}

module.exports = auth