const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: String,
  time: String
})

module.exports = Event = mongoose.model('event', EventSchema)
