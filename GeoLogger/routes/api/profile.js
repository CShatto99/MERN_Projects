const express = require('express')
const router = express.Router()

const Profile = require('../../models/profile')

// @route GET /api/profile
// @desc Get a user profile
// @access Private
router.get('/:_id', async (req, res) => {
  try {
    const profile = await Profile.findById({ _id: req.params._id })

    res.json(profile)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route POST /api/profile
// @desc Create a user profile
// @access Private
router.post('/', async (req, res) => {
  const { fillColor } = req.body

  const profileFields = new Profile({
    fillColor
  })

  try {
    const profile = await profileFields.save()

    res.json(profile)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
