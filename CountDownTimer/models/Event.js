const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: [Number],
  time: [Number]
})

module.exports = Event = mongoose.model('event', EventSchema)
