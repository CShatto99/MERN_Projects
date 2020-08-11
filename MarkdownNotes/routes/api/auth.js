const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const RefreshToken = require('../../models/RefreshToken')
const genAccessToken = require('../../middleware/genAccessToken')

// @route POST /api/auth/token
// @desc  Refresh a token
// @access Public
router.post('/token', async (req, res) => {
  const { refreshToken } = req.body

  try {
    const user = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN)

    const foundToken = await RefreshToken.findOne({ token: refreshToken })

    if(!foundToken)
      return res.status(403).json({ msg: 'Token does not exist' })

    const accessToken = genAccessToken(user)

    res.json({ accessToken })
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route GET /api/auth
// @desc  Load a user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select('-password -notes')
    res.json(user)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route POST /api/auth
// @desc  Login a user
// @access Public
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    if(!email || !password)
      return res.status(400).json({ msg: 'Please enter all required fields' })

    const user = await User.findOne({ email })

    if(!user)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)

    if(!match)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const accessToken = genAccessToken(user)
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET_TOKEN)

    const newRefreshToken = new RefreshToken({ token: refreshToken })
    await newRefreshToken.save()

    res.json({
      accessToken,
      refreshToken,
      user: { name: user.name, email }
    })

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route DELETE /api/auth/logout
// @desc  Delete a refresh token
// @access Public
router.delete('/logout', auth, async (req, res) => {
  console.log(req.body)
  try {
    const tokenFound = await RefreshToken.findOne({ token: req.body.token})

    if(!tokenFound)
      return res.status(403).json({ msg: 'Token does not exist' })

    await RefreshToken.findByIdAndDelete({ _id: tokenFound._id })

    res.send('Success')
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route DELETE /api/auth
// @desc  Delete a user
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.user._id })

    res.status(204)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route PUT /api/auth
// @desc  Update a user
// @access Private
router.put('/', auth, async (req, res) => {
  try {
    const { name, email } = req.body

    if(!name || !email)
      return res.status(400).json({ msg: 'Please enter a name and email' })

    const existingUser = await User.findOne({ email })

    if(existingUser && req.user._id !== existingUser._id.toString())
      return res.status(409).json({ msg: 'User already exists' })

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { name, email },
      { new: true }
    ).select('-password -notes')

    res.json(updatedUser)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
