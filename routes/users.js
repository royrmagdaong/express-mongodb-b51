const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10;


// CRUD - CREATE, READ, UPDATE, DELETE

// read
router.get('/',(req,res)=>{
    try {
            const pi = 3.14
            res.status(200).json({message: 'get all users', data: []})
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

// get all users
// read but authorized
router.get('/get-users', async (req,res)=>{
    try {
            // const token = 
            let tokenHeader = req.headers['authorization']
            if(tokenHeader){
                let token = tokenHeader.split(" ")
                
                jwt.verify(token[1], 'jobhunt', async (err, decodedToken) => {
                    if(err) await res.status(200).json({ errorMessage: 'invalid Token!'})
                    if(decodedToken){
                        let users = await User.find({}).select('name email role _id').where({deleted_at: null})
                        await res.status(200).json({ message: 'Authorized!', decodedToken, users })
                    }
                })
            }else{
                res.status(401).json({ errorMessage: 'unauthorized!'})
            }
            
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

// get user via email params
router.get('/user/:email', async (req,res)=>{
    try {
            let email = req.params.email
            let user = await User.find({ email: email })
            await res.status(200).json({message: `get ${email} information`, user: user})
            
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

router.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    try {
        let user = await User.findOne({ email: email}).exec()
        if(user){
            if(user.deleted_at === null) {
                // comparing plain password to hashed password
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err) res.status(500).json({message: err})
                    if(result){ // successful login
                        // token generation
                        jwt.sign({ role: user.role, email: user.email, id: user._id }, 'jobhunt', {expiresIn: '1d'}, (err, token) => {
                            if(err) res.status(500).json({errorMessage: err})
                            if(token){
                                res.status(200).json({message: 'logged in successfully!', user: {
                                    email: user.email,
                                    role: user.role,
                                    token: token
                                }})
                            }
                        })
                    }else{
                        res.status(200).json({message: 'incorrect password'})
                    }
                })
                
            }else{
                res.status(404).json({message: 'user not exist!'})
            }
        }
        
    } catch (error) {
            res.status(500).json({message: error.message})
    }
})

// register normal user
router.post('/register-user',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    // 
    try {
        // password hashing
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) res.status(500).json({message: `registration failed!`, error: err})

            bcrypt.hash(password, salt, async (err, hash) => {
                // Store hash in your password DB.
                if(err) res.status(500).json({message: `password hashing failed!`, error: err})
                if(hash){
                    const user = new User({
                        email: email,
                        password: hash,
                        role: "normal-user"
                    })

                    await user.save()
                    res.status(200).json({message: `user ${email} created!`, user: user})
                }
            });
        });

            
    } catch (error) {
        if(error.errorResponse.code === 11000){
            res.status(500).json({message: `${email} is already existed. try another email`})
        }
        res.status(500).json({message: error})
    }
})

// soft delete user
router.post('/delete-user',async (req,res)=>{
    const email = req.body.email

    // 
    try {
       let user = await User.findOne({ email: email}).exec()
       if(user){
            let newUser = await User.findOne({ email: email}).updateOne({deleted_at: new Date()})

            res.status(500).json({message: `${email} deleted successfully!`, user: newUser})
       }else{
            res.status(500).json({message: `${email} is not exists!`})
       }

            
    } catch (error) {
        res.status(500).json({message: error})
    }
})

// update user
router.post('/update-user',async (req,res)=>{
    const email = req.body.email
    const name = req.body.name
    // 
    try {
       let user = await User.findOne({ email: email}).exec()
       if(user){
            let newUser = await User.findOne({ email: email}).where({deleted_at: null}).updateOne({name: name})

            res.status(500).json({message: `${email} updated successfully!`, user: newUser})
       }else{
            res.status(500).json({message: `${email} is not exists!`})
       }

            
    } catch (error) {
        res.status(500).json({message: error})
    }
})



module.exports = router