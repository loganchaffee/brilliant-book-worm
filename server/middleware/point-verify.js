import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const pointVerify = async (req, res, next) => {
    try {
        
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error calculating points on the server.')
    }
}

export default pointVerify