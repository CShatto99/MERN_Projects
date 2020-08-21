const express = require('express')
const https = require('https')
const app = express()

app.use(express.json())

const port = process.env.NODE_ENV || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
