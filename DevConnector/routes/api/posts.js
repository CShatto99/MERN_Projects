const express = require('express')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const router = express.Router()

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../')

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.get('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
  ]
],
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() })

})

module.exports = router
