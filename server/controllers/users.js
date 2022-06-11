import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import Book from '../models/book.js'
import Post from '../models/post.js'


export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body
        
        // Check for existing user
        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(404).json({ message: 'User already exists.' })

        // Hash user's password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user in database
        const newUser = new User({name: name, email: email, password: hashedPassword})
        const returnedUser = await newUser.save()
        
        // Serialize username/password with jsonwebtoken
        const accessToken = jwt.sign({ email: returnedUser.email, id: returnedUser._id }, process.env.ACCESS_TOKEN_SECRET)
        
        res.status(201).json({ accessToken, user: returnedUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check for existing user
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) return res.status(404).json({ message: 'This user does not exist.' })

        // Compare user's password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(404).json({ message: 'Incorrect password' })
  
        const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET)
        
        res.status(201).json({ accessToken: accessToken, user: existingUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const getUserInfo = async (req, res) => {
    try {
        // Check for existing user
        const existingUser = await User.findOne({ _id: req.userId })
        .populate('following', 'name')
        .populate('followers', 'name')

        if (!existingUser) return res.status(404).json({ message: 'This user does not exist.' })

        res.status(200).json({ user: existingUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// Update User
export const updateUser = async (req, res) => {
    try {
        const id = req.userId
        const body = req.body

        // Check for taken usernames and emails
        const userWithCredMatch = await User.findOne({ $or: [ { name: body.name }, { email: body.email } ] })

        if (userWithCredMatch) {
            if (userWithCredMatch._id.toString() !== id ) return res.status(400).send('A user with that name or email already exists')
        }
       
        // Update user
        const updatedUser = await User.findByIdAndUpdate(id,  { ...body }, { returnDocument: 'after' })
        if (!updatedUser) return res.status(404).send('User not found')

        // Create new token if the email or name changed
        if (body.email) {
            const accessToken = jwt.sign({ email: updatedUser.email, id: updatedUser._id }, process.env.ACCESS_TOKEN_SECRET)
            return res.status(200).json({ updatedUser, accessToken })
        }

        res.status(200).json({ updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const removedUser = await User.findOneAndDelete({ _id: req.userId })
        await Post.deleteMany({ createdBy: req.userId })
        await Book.deleteMany({ createdBy: req.userId })
        await User.updateMany({}, { $pull: { following: req.userId } })
        await User.updateMany({}, { $pull: { followers: req.userId } })

        res.status(204).json({ removedUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const follow = async (req, res) => {
    try {
        const visitedUserId = req.body._id
        const userId = req.userId

        // Add followee to main user
        await User.findByIdAndUpdate(userId, { $addToSet: { following: visitedUserId } })
        
        // Add follower to visited user
        await User.findByIdAndUpdate(visitedUserId , { $addToSet: { followers: userId } })
       
        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const unfollow = async (req, res) => {
    try {
        const visitedUserId = req.body._id
        const userId = req.userId

        // Remove followee from main user
        await User.findByIdAndUpdate(userId, { $pull: { following: visitedUserId } })

        // Remove follower from visited user
        await User.findByIdAndUpdate(visitedUserId, { $pull: { followers: userId } })

        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}