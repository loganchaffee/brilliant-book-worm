import mongoose from "mongoose"

const resetTokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User",
        required: true,
    },
    tokenString: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
})

const ResetToken = mongoose.model('ResetToken', resetTokenSchema)

export default ResetToken;