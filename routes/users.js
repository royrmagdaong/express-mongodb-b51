const express = require('express')
const router = express.Router()
const User = require('../model/user')


router.get('/',(req,res)=>{
    try {
            const pi = 3.14
            res.status(200).json({message: 'get all users', data: []})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

router.get('/get-users', async (req,res)=>{
    try {
            let users = await User.find({})
            await res.status(200).json({message: 'get all users', users: users})
            
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

router.get('/user/:email', async (req,res)=>{
    try {
            let email = req.params.email
            let user = await User.find({ email: email })
            await res.status(200).json({message: `get ${email} information`, user: user})
            
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

router.post('/login',(req,res)=>{
    try {
            

        res.status(200).json({message: 'logged in successfully!', data: [], users: {email, password}})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

// register normal user
router.post('/register-user',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    try {

            const user = new User({
                email: email,
                password: password,
                role: "normal-user"
            })

            await user.save()

            res.status(200).json({message: `user ${email} created!`, user: user})
    } catch (error) {
        if(error.errorResponse.code === 11000){
            res.status(500).json({message: `${email} is already existed. try another email`})
        }
        res.status(500).json({message: error})
    }
})

module.exports = router