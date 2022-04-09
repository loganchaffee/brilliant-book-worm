import express from 'express';
import mongoose from 'mongoose';
import Post from "../models/post.js"
import Book from "../models/Book.js"
import User from '../models/user.js'

export const createPost = async (req, res) => {
    try {

        // const action = req.body.action
        // const bookId = req.body.bookId
        // const userId = req.userId

        // const book = await Book.findById(bookId, { title: 1, author: 1, review: 1 })
        // const createdBy = await User.findById(userId, { name: 1, level: 1, profileImage: 1 })

        // const newPost = new Post({ createdBy, book, action })
        // await newPost.save()

        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export const fetchPosts = async (req, res) => {
    try {
        const userId = req.userId

        const user = await User.findById(userId, { following: 1 })
        const following = user.following

        const posts = await Post.find({ "createdBy" : { $in : following } })
        .populate('createdBy', 'name level profileImage')
        .populate('book', 'title author')
        .populate('createdAt')

        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body
        // Check for existing post
        const existingPost = await Post.findById(postId)

        if (existingPost) {
            // Check if user has already liked this post
            const indexOfLiker = existingPost.likedBy.findIndex((likerId) => likerId.toString() === userId)

            // If the user has already liked this post remove their _id from the likedBy array
            if (indexOfLiker > -1) {
                const likedBy = [...existingPost.likedBy]
                likedBy.splice(indexOfLiker, 1)
                const updatedPost = await Post.findByIdAndUpdate(postId, { likedBy: likedBy }, { returnDocument: 'after' })
                return res.status(200).send({ updatedPost })
            }

            // If the user has not liked this post yet add their _id to the likedBy array
            const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { likedBy: userId } }, { returnDocument: 'after' })
            return res.status(200).send({ updatedPost })
        }

        // If no existing post send 404
        return res.status(404).send('No post with that id')
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

export const dislikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body
        
        // Check for existing post
        const existingPost = await Post.findById(postId)

        if (existingPost) {
            // Check if user has already liked this post
            const indexOfLiker = existingPost.dislikedBy.findIndex((likerId) => likerId.toString() === userId)

            // If the user has already liked this post remove their _id from the dislikedBy array
            if (indexOfLiker > -1) {
                const dislikedBy = [...existingPost.dislikedBy]
                dislikedBy.splice(indexOfLiker, 1)
                const updatedPost = await Post.findByIdAndUpdate(postId, { dislikedBy: dislikedBy }, { returnDocument: 'after' })
                return res.status(200).send({ updatedPost })
            }

            // If the user has not liked this post yet add their _id to the dislikedBy array
            const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { dislikedBy: userId } }, { returnDocument: 'after' })
            return res.status(200).send({ updatedPost })
        }

        // If no existing post send 404
        return res.status(404).send('No post with that id')
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}