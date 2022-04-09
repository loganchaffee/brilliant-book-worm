import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import {} from 'dotenv/config'

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
            if (userWithCredMatch._id.toString() !== id ) return res.status(400).send('A user with that name already exists')
        }
       
        // Update user
        const updatedUser = await User.findByIdAndUpdate(id, { ...body }, { returnDocument: 'after' })
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
        if (!removedUser) return res.status(404).json({ message: 'This user does not exist.' })
        res.status(204).json({ removedUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const follow = async (req, res) => {
    try {
        const visitedUserId = req.body._id
        
        // Add followee to main user
        const userDoc = await User.findById(req.userId, { following: 1 })
        const indexOfFollowee = userDoc.following.findIndex((followeeId) => {
            return followeeId.toString() === visitedUserId
        })
        if (indexOfFollowee === -1) {
            userDoc.following.push(visitedUserId)
            await userDoc.save()
        }

        // Add follower to visited user
        const visitedUserDoc = await User.findById(visitedUserId, { followers: 1 })
        const indexOfFollower = visitedUserDoc.followers.findIndex((followerId) => {
            return followerId.toString() === req.userId
        })
        if (indexOfFollower === -1) {
            visitedUserDoc.followers.push(req.userId)
            await visitedUserDoc.save()
        }

        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const unfollow = async (req, res) => {
    try {
        const visitedUserId = req.body._id

        // Remove followee from main user
        const userDoc = await User.findById(req.userId, { following: 1 })
        const indexOfFollowee = userDoc.following.findIndex((followeeId) => {
            return followeeId.toString() === visitedUserId
        })
        if (indexOfFollowee > -1) {
            userDoc.following.splice(indexOfFollowee, 1)
            userDoc.save()
        }

        // Remove follower from visited user
        const visitedUserDoc = await User.findById(visitedUserId, { followers: 1 })
        const indexOfFollower = visitedUserDoc.followers.findIndex((followerId) => {
            return followerId.toString() === req.userId
        })
        if (indexOfFollower > -1) {
            visitedUserDoc.followers.splice(indexOfFollower, 1)
            visitedUserDoc.save()
        }

        res.status(200)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}