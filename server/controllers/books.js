import express from 'express';
import mongoose from 'mongoose';
import Book from "../models/Book.js"
import Post from "../models/post.js"

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({createdBy: req.userId})
        
        res.status(200).json(books)
    } catch (error) {
        res.status(404).json(error)
    }
}

// Allow user to see other user's books
export const fetchVisitedUserBooks = async (req, res) => {
    try {
        const visitedUserId = req.body.visitedUserId

        const books = await Book.find({ createdBy: visitedUserId })

        res.status(200).json(books)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const createBook = async (req, res) => {
    try {
        // Create Book
        const book = req.body
        const newBook = new Book({ ...book, createdBy: req.userId })
        await newBook.save()
        res.status(201).json(newBook)

        // Create Post
        const newPost = new Post({
            createdBy: req.userId,
            book: newBook._id,
            action: 'Just started reading'
        })
        newPost.save()
    } catch (error) {
        res.status(409).json(error)
    }
}
 
export const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const book = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No book with that id')

        const updatedBook = await Book.findByIdAndUpdate(id, { ...book }, { new: true }) // Mongoose needs {new: true} or it will return the old version of the document

        res.status(201).json(updatedBook)

        if (updatedBook.isCompleted) {
            const matchingPosts = await Post.find({ book: id })
            if (matchingPosts.length < 2) {
                const newPost = new Post({
                    createdBy: req.userId,
                    book: newBook._id,
                    action: 'Just finished reading'
                })
                newPost.save()
            }
        }
        
    } catch (error) {
        res.status(409).json(error)
    }
}

export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No book with that id')
        }

        await Book.findByIdAndDelete(id) 

        res.json({ message: 'Book deleted successfully'})
    } catch (error) {
        res.status(404).json(error)
    }
}