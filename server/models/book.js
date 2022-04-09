import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    publicationDate: {
        type: String,
    },
    review: {
        type: String,
    },
    numberOfStars: {
        type: Number,
        default: 0
    },
    createdBy: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "User"
    },
    deadline: Date,
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

export default Book;