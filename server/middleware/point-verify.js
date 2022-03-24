import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// Middleware that runs on every update user request
const pointVerify = async (req, res, next) => {
    try {
        const body = req.body

        if (body.points) {
            let level = 1
            if (body.points >= 1000) {level = 2}
            if (body.points >= 2500) {level = 3}
            if (body.points >= 5000) {level = 4}
            req.body.level = level
        }

        next()
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error calculating points on the server.')
    }
}

export default pointVerify