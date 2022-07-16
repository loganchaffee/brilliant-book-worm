import express from 'express';
import mongoose from 'mongoose';
import Post from "../models/post.js"
import Book from "../models/book.js"
import User from '../models/user.js'
import Notification from '../models/notification.js';

export const createPost = async (req, res) => { 
    // try {

    //     res.status(200)
    // } catch (error) {
    //     console.log(error);
    //     res.status(500)
    // }
}

export const fetchPost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id)
        .populate('createdBy', 'name level profileImage')
        .populate('book', 'title author review thumbnail')
        .populate('createdAt')
        .populate('comments')
        .populate('comments.createdBy', 'name level')

        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const fetchUsersPost = async (req, res) => {

}

export const fetchPosts = async (req, res) => {
    try {
        console.log(req.body);

        const userId = req.userId
        const user = await User.findById(userId, { following: 1 })
        const following = user.following

        const limit = 20
        const startIndex = Number(req.body.postsLength)
        const totalPosts = await Post.countDocuments({ $or: [{ "createdBy" : { $in : following } }, { createdBy : userId }] })

        if (startIndex >= totalPosts) return res.status(200).json([])

        if (user.following.length <= 0) {
            const posts = await Post.find({ createdBy : userId })
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name level profileImage')
            .populate('book', 'title subtitle author review thumbnail')
            .populate('createdAt')
            .populate('comments')
            .populate('comments.createdBy', 'name level')
            .limit(limit)
            .skip(startIndex)

            return res.status(200).json(posts)
        }

        const posts = await Post.find({ $or: [{ "createdBy" : { $in : following } }, { createdBy : userId }] })
        .sort({ createdAt: -1 })
        .populate('createdBy', 'name level profileImage')
        .populate('book', 'title subtitle author review thumbnail')
        .populate('createdAt')
        .populate('comments')
        .populate('comments.createdBy', 'name level')
        .limit(limit)
        .skip(startIndex)

        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body

        const existingPost = await Post.findById(postId)

        const indexOfLiker = existingPost.likedBy.findIndex((likerId) => likerId.toString() === userId)

        if (indexOfLiker <= -1) {
            await Post.findByIdAndUpdate(postId, { $addToSet: { likedBy: userId } })
            await Post.findByIdAndUpdate(postId, { $pull: { dislikedBy: userId } })
        } else {
            await Post.findByIdAndUpdate(postId, { $pull: { likedBy: userId } })
        }
       
        return res.status(200).json({message: 'success'})
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export const dislikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body

        const existingPost = await Post.findById(postId)

        const indexOfLiker = existingPost.dislikedBy.findIndex((likerId) => likerId.toString() === userId)

        if (indexOfLiker <= -1) {
            await Post.findByIdAndUpdate(postId, { $addToSet: { dislikedBy: userId } })
            await Post.findByIdAndUpdate(postId, { $pull: { likedBy: userId } })
        } else {
            await Post.findByIdAndUpdate(postId, { $pull: { dislikedBy: userId } })
        }
       
        return res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export const createComment = async (req, res) => {
    try {
        const { postId, formData } = req.body

        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')

        const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: { createdBy: req.userId, text: formData } } }, { returnDocument: 'after' })
        .populate('comments')
        .populate('comments.createdBy', 'name level')

        res.status(200).json(updatedPost)

        if (updatedPost.createdBy.toString() !== req.userId) {
            const newNotification = new Notification({ 
                message: 'commented on your post',
                post: updatedPost._id,
                createdBy: req.userId, 
                recipient: updatedPost.createdBy
            })

            await newNotification.save()
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.body

        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send('No post with that id')

        await Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId, createdBy: req.userId } } })
        
        res.status(200).json({ message: 'success' })
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}