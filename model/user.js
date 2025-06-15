const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    },
    deleted_at: { // soft delete
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('User', userSchema)