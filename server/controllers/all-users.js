import express from 'express';
import mongoose from 'mongoose';
import User from "../models/user.js"

export const fetchUsers = async (req, res) => {
    try {
        const query = req.body.query

        const matchingDocuments = await User.find(
            { "name" : { $regex: query, $options: 'i' }, "private" : false }, 
            { name: 1 }
        );
        
        res.status(200).json(matchingDocuments)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const fetchVisitedUser = async (req, res) => {
    try {
        const visitedUserId = req.body._id

        const visitedUser = await User.findOne({ _id: visitedUserId }, { password: 0, email: 0 })
        .populate('following', 'name')
        .populate('followers', 'name')

        if (!visitedUser) return res.status(404).json({ message: 'This user does not exist.' })

        res.status(200).json({visitedUser: visitedUser})
    } catch (error) {
        res.status(404).json(error)
    }
}