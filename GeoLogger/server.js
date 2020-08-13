const express = require('express')
const app = express()
const connectDB = require('./config/db')

app.use(express.json())

connectDB()

app.use('/api/profile', require('./routes/api/profile'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
