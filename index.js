const express = require('express')
const cors = require('cors')
const app = express()


const port = 5000

app.use(cors())


app.get('/', (req, res) => {
   try {
        const pi = 3.14
        pi = 1233;
        res.status(200).json({message: 'hello world', data: [1,2,3,4,5]})
   } catch (error) {
        res.status(500).json({message: error.message})
   }
})

app.get('/contact', (req, res) => {
    res.status(200).json({message: 'contacts', data: [1,2,3,4,5]})
})

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
    console.log('hello world 2')
})