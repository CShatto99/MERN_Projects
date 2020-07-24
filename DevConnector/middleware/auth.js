require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const accessToken = req.headers['x-auth-token']

  if(!accessToken)
    return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    req.user = decoded.user
    next()
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
