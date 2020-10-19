import express, { json } from 'express'
const app = express()
import { connect } from 'mongoose'
import { config } from 'dotenv'
import postRoute from './routes/posts'
import homeRoute from './routes/home'

config();

//Import Routes
import authRoute from './routes/oAuth/auth'
import clientRoute from './routes/client/registerClient'

// Connect DB
const db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@auth-cluster.gnkyo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('DB Connection Healthy...!!! '))

// Middleware
app.use(json())

// Routes Middleware
app.use('/', homeRoute)
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/register', clientRoute)

app.listen(process.env.SERVICE_PORT, () => console.log('Server Up at localhost:' + process.env.SERVICE_PORT))
