const express = require('express')
const cors = require('cors')
const app = express()



const port = 5000

//middlewares
app.use(cors())
app.use(express.json()) //Notice express.json middleware


app.get('/', (req, res) => {
   try {
        const pi = 3.14
        res.status(200).json({message: 'hello world', data: [1,2,3,4,5]})
   } catch (error) {
        res.status(500).json({message: error.message})
   }
})

app.get('/:id', (req, res) => {
   try {
        const id = req.params.id
        console.log('id', id)
        // db query
        // user info

        res.status(200).json({message: 'hello world', data: [1,2,3,4,5]})
   } catch (error) {
        res.status(500).json({message: error.message})
   }
})

app.post('/', (req, res) => {
   try {
        // console.log(req.body)
        const username = req.body.username
        const password = req.body.password
        console.log('username', username)
        console.log('password', password)

        // if username exists
        // password is correct
        

        res.status(200).json({message: 'success'})
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