require('dotenv').config()
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
  const token = req.headers['x-auth-token']

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)

    req.user = decoded

    next()
  } catch(err) {
    console.error(err)
    res.status(401).json({ msg: 'Invalid token, try again' })
  }
}

const genAccessToken = user => jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: 30 })

module.exports = auth
