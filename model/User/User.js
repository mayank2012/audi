const mongoogse = require('mongoose')

const userSchema = new mongoogse.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 512
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 512
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 2048
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoogse.model('User', userSchema)