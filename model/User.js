const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name: {
        type:String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        unique: true,
        required: true,
        min: 8,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    isadmin: {
        type: Boolean
    }
})

module.exports = mongoose.model('User',userSchema)