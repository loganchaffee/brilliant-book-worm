import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import {} from 'dotenv/config'

export const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body

        console.log(req.body);
        
        // Check for existing user
        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(404).json({ message: 'User already exists.' })

        // Hash user's password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user in database
        const newUser = new User({firstName: firstName, lastName: lastName, email: email, password: hashedPassword})
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
        if (!existingUser) return res.status(404).json({ message: 'This user does not exist.' })

        res.status(200).json({ user: existingUser })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}