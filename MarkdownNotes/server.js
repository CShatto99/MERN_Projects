const express = require('express')
const connectDB = require('./config/db')
const app = express()

app.use(express.json())

connectDB()

app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/note', require('./routes/api/note'))

const port = process.env.NODE_ENV || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))
