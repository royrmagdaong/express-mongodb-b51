const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    try {
            const pi = 3.14
            res.status(200).json({message: 'get all users', data: []})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

router.post('/login',(req,res)=>{
    try {
            const email = req.body.email
            const password = req.body.password

        res.status(200).json({message: 'logged in successfully!', data: [], users: {email, password}})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

router.post('/register',(req,res)=>{
    try {
            res.status(200).json({message: 'registration complete'})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

module.exports = router