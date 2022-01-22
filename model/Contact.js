
const { required } = require('joi/lib/types/alternatives')
const mongoose = require('mongoose')

const contactSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
        min: 4
    },
    message: {
        type: String,
        required: true,
        min: 4
    }
});

module.exports = mongoose.model('Contact', contactSchema);


