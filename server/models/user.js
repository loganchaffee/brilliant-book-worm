import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    private: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String, 
        default: ''
    },
    wordsPerMinute: {
        type: Number, 
        default: 0
    }, 
    dateOfLastReading: {
        type: Date, 
    },
    points: {
        type: Number, 
        default: 0
    },
    level: {
        type: Number, 
        default: 1
    },
    following: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], 
        default: []
    },
    followers: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], 
        default: []
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User;
