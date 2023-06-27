require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.VUE_APP_CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app.listen(3000, () => console.log('Server is running on port 3000...'))