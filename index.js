const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const postRoute = require('./routes/posts')

dotenv.config();

//Import Routes
const authRoute = require('./routes/auth')

// Connect DB
const db_url = process.env.DB_URL
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('DB Connection Healthy...!!! '))

// Middleware
app.use(express.json())

// Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(8000, () => console.log('Server Up'))
