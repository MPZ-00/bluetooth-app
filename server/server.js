const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config({
    path: '../.env'
})

const app = express()
app.use(cors())
app.use(express.json()) // needed to parse json body of requests
app.use('/', routes)

const port = process.env.PORT || 3000

mongoose.connect(process.env.VUE_APP_CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB...')
}).catch((err) => {
    console.error('Could not connect to MongoDB...', err)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})