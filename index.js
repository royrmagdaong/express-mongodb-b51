const express = require('express')
const cors = require('cors')
const app = express()

const port = 5000

//middlewares
app.use(cors())
app.use(express.json()) //Notice express.json middleware

// import routes
const userRoutes = require('./routes/users')

app.use('/api/user', userRoutes)


app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
    console.log('hello world 2')
})