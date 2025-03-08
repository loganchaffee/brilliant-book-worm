import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    createdBy: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User",
        required: true
    },
    book: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "Book",
        required: true
    },
    likedBy: { 
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], 
        default: []
    },
    dislikedBy: { 
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], 
        default: []
    },
    comments: { 
        type: [{ 
            createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
            text: { type: String }
        }], 
        default: []
    },
    action: { type: String, required: true },
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post;
