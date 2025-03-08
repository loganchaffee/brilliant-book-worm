import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    message: { type: String },
    post:{ 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "Post"
    },
    recipient: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User"
    },
    createdBy: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User"
    },
    viewed: { 
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification;