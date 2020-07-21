require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]

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
