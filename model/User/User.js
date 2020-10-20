import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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

export default mongoose.model('User', userSchema)