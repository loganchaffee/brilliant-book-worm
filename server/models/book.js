import mongoose from "mongoose"

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    numberOfPages: Number,
    currentPage: Number,
    publicationDate: String,
    review: String,
    numberOfStars: Number,
    createdBy: String,
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book;