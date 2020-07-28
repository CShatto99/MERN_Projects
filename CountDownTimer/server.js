const express = require('express')
const mongoose = require('mongoose')
const app = express()
const connectDB = require('./config/db')

app.use(express.json())

connectDB()

app.use('/api/timer', require('./routes/api/timer'))

const port = process.env.NODE_ENV || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))
