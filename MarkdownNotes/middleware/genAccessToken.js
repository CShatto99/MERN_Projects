const jwt = require('jsonwebtoken')

const genAccessToken = user => jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: 30 })

module.exports = genAccessToken
