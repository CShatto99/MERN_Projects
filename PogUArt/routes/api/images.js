const express = require('express')
const router = express.Router()

const Image = require('../../models/image')

// @route GET /api/images
// @desc Get all images
// @access Public
router.get('/', async (req, res) => {
  try {
    const items = await Image.find({})
    res.json(items)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
