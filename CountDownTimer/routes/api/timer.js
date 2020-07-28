const express = require('express')
const router = express.Router()

const Event = require('../../models/Event')

router.get('/', (req, res) => {
  res.json({ msg: 'hello world' })
})

router.post('/', async (req, res) => {
  const { name, date, time } = req.body

  if(!name)
    return res.status(400).json({ msg: 'Please enter a name' })

  let dateFields

  if(!date) {
    return res.status(400).json({ msg: 'Please enter a date' })
  }
  else {
    dateFields = date.split('-').map(num => {
      num.trim()
      return parseInt(num)
    })

    if(dateFields.length != 3)
      return res.status(400).json({ msg: 'Enter 3 hyphen-separated numbers' })
  }

  let timeFields = [0,0,0]

  if(time) {
    timeFields = time.split(',').map(num => {
      num.trim()
      return parseInt(num)
    })

    if(timeFields.length > 3)
      return res.status(400).json({ msg: 'Enter no more than 3 numbers' })

    if(timeFields[0] < 0 || timeFields[0] > 23)
      return res.status(400).json({ msg: 'Hours must be between 0 and 23' })
    if(timeFields[1] < 0 || timeFields[1] > 59)
      return res.status(400).json({ msg: 'Minutes must be between 0 and 59' })
    if(timeFields[2] < 0 || timeFields[2] > 59)
      return res.status(400).json({ msg: 'Seconds must be between 0 and 59' })
  }

  const newEvent = new Event({
    name,
    date: dateFields,
    time: timeFields
  })

  try {
    newEvent.validateSync()
    const response = await newEvent.save()

    res.json(response)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
