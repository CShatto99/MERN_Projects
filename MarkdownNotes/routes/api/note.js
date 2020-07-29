const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Note = require('../../models/Note')

// @route POST /api/note
// @desc Create a note
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    user.notes.push({ text: req.body.text })

    const updatedUser = await user.save()

    res.json(updatedUser)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

})

// @route GET /api/note
// @desc Get user notes
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    res.json(user.notes)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route DELETE /api/note
// @desc Delete a note by id
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    user.notes = user.notes.filter(note => note._id.toString() !== req.body._id)

    await user.save()

    res.json(user.notes)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route PUT /api/note
// @desc Edit a noteby id
// @access Private
router.put('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    user.notes.map(note => {
      if(note._id === req.body._id)
        return note.text = req.body.text
    })

    await user.save()

    res.json(user.notes)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
