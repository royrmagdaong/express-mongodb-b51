const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const app = express()


const port = 5000

//middlewares
app.use(cors())
app.use(express.json()) //Notice express.json middleware

// connect to mongodb
// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/jobhunt')

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



// import routes
const userRoutes = require('./routes/users')

app.use('/api/user', userRoutes)


app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
    console.log('hello world 2')
})