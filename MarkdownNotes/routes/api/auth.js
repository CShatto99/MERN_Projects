const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route POST /api/auth
// @desc  Login a user
// @access Private
router.post('/', auth, async (req, res) => {
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
    else
      res.json(user)
       
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

})

module.exports = router
