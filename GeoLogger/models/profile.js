const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  visited: {
    type: [String],
    default: []
  },
  fillColor: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
