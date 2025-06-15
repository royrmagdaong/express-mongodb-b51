const express = require('express')
const cors = require('cors')
const app = express()


const port = 5000

app.use(cors())


app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
    console.log('hello world 2')
})