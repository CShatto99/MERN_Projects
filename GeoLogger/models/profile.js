const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  theme: {
    type: String,
    default: 'dark'
  },
  visited: {
    type: [String],
    default: []
  },
  fillColor: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
