const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route GET /api/auth
// @desc  Load a user
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select('-password')
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
      return res.status(400).json({ msg: 'Please enter all fields' })

    const user = await User.findOne({ email })

    if(!user)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)

    if(!match)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: 600 })

    res.json({
      token,
      user: { name: user.name, email }
    })

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

})

module.exports = router
