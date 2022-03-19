import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profileImage: {type: String, default: ''},

    wordsPerMinute: {type: Number, default: 0}, 
    dateOfLastReading: {type: String, default: ''},
    points: {type: Number, default: 0}, 

    following: {type: Array, default: []},
    followers: {type: Array, default: []},
})

const User = mongoose.model('User', userSchema)

export default User;
