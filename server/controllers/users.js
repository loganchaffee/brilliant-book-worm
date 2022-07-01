import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import Book from '../models/book.js'
import Post from '../models/post.js'
import Notification from '../models/notification.js'
import nodemailer from "nodemailer";
import crypto from 'crypto'
import ResetToken from '../models/reset-token.js';

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body
        
        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ email: email }, { name: name }] })
        if (existingUser) return res.status(409).send('A user with that name or email already exists')

        // Hash user's password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user in database
        const newUser = new User({ name: name, email: email, password: hashedPassword })
        const returnedUser = await newUser.save()
        
        // Serialize email/password with jsonwebtoken
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
        .populate('following', 'name')
        .populate('followers', 'name')

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

        let updatedUser
        
        // Handle user detail updates
        if (body.name) {
            // Check for taken usernames and emails
            const userWithNameMatch = await User.findOne({ name: body.name }, { _id: 1 })
            const userWithEmailMatch = await User.findOne({ email: body.email }, { _id: 1 })
            if (userWithNameMatch) {
                if (userWithNameMatch._id.toString() !== id ) return res.status(400).send('A user with that name already exists')
            }
            if (userWithEmailMatch) {
                if (userWithEmailMatch._id.toString() !== id ) return res.status(400).send('A user with that email already exists')
            }

            // Update user
            if (body.private) {
                updatedUser = await User.findByIdAndUpdate(id,  { ...body, followers: [] }, { returnDocument: 'after' }).populate('following', 'name')
                await User.updateMany({}, { $pull: { following: req.userId } }) // Unfollow private user by all other users
            } else {
                updatedUser = await User.findByIdAndUpdate(id,  { ...body }, { returnDocument: 'after' })
                .populate('following', 'name')
                .populate('followers', 'name')
            }
            if (!updatedUser) return res.status(404).send('User not found')

            // Create new jwt
            const accessToken = jwt.sign({ email: updatedUser.email, id: updatedUser._id }, process.env.ACCESS_TOKEN_SECRET)
                return res.status(200).json({ updatedUser, accessToken })
        }

        // Update user
        updatedUser = await User.findByIdAndUpdate(id,  { ...body, followers: [] }, { returnDocument: 'after' }).populate('following', 'name')
        if (!updatedUser) return res.status(404).send('User not found')

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
        await Notification.deleteMany({ createdBy: req.userId })
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

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body

        const existingUser = await User.findOne({ email: email }, { _id: 1 })
        if (!existingUser) return res.status(404).send('No user with that email')

        let tokenString = crypto.randomBytes(32).toString("hex");

        const hashedTokenString = await bcrypt.hash(tokenString, 12)

        await ResetToken.deleteMany({ userId: existingUser._id })

        const newResetToken = new ResetToken({ userId: existingUser._id, tokenString: hashedTokenString })
        await newResetToken.save()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'loganschaffee@gmail.com',
                pass: 'mqxgybrptlnzrfjw' 
            }
        });

        const options = {
            from: 'Book Worm',
            to: email,
            subject: 'Password Reset',
            html: `
                <h1>Password Reset</h1>
                <a href='http://localhost:3000/reset-password/${tokenString}'>Click here to reset password</a>
            `
        }

        transporter.sendMail(options, function(err, info){
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: 'success'})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password, token } = req.body

        const existingUser = await User.findOne({ email }, { _id: 1 })
        if (!existingUser) return res.status(404).send('No user with that email')

        const resetToken = await ResetToken.findOne({ userId: existingUser._id })
        if (!resetToken) return res.status(404).send('Reset token has expired')

        const tokensMatch = await bcrypt.compare(token, resetToken.tokenString)
        if (!tokensMatch) return res.status(404).send('Reset token has expired')

        const newHashedPassword = await bcrypt.hash(password, 12)

        await User.updateOne({ _id: existingUser._id }, { password: newHashedPassword })

        await ResetToken.findByIdAndDelete(resetToken._id)

        res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        res.status(500).send('There was an error')
    }
}