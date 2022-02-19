import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
// Add .env config here

app.get('/', (req, res) => {
    res.send('Hello to the Book Worm API')
})

import bookRoutes from './routes/books.js'
import userRoutes from './routes/users.js'

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/books', bookRoutes)
app.use('/users', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT} and the database connection is good`)))
    .catch((error) => console.log('Error: ', error.message))
