const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/User')
const RefreshToken = require('../../models/RefreshToken')
const genAccessToken = require('../../middleware/genAccessToken')

// @route POST /api/user
// @desc Register a user
// @access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password)
    return res.status(400).json({ msg: 'Please enter all required fields' })

  if(password.length < 6)
    return res.status(400).json({ msg: 'Password must be at least 6 characters long' })

  const existingUser = await User.findOne({ email })

  if(existingUser)
    return res.status(400).json({ msg: 'User already exists' })

  try {
    const newUser = new User({
      name,
      email,
      password
    })

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(password, salt)

    const user = await newUser.save()

    const accessToken = genAccessToken(user)
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET_TOKEN)

    const newRefreshToken = new RefreshToken({ token: refreshToken })
    await newRefreshToken.save()

    res.json({
      accessToken,
      refreshToken,
      user: { name, email }
    })

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

})

module.exports = router
