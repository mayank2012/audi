const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const postRoute = require('./routes/posts')

dotenv.config();

//Import Routes
const authRoute = require('./routes/oAuth/auth')
const clientRoute = require('./routes/client/registerClient')

// Connect DB
const db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@auth-cluster.gnkyo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('DB Connection Healthy...!!! '))

// Middleware
app.use(express.json())

// Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/register', clientRoute)

app.listen(process.env.SERVICE_PORT, () => console.log('Server Up at localhost:'+process.env.SERVICE_PORT))
