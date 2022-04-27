import express from 'express';
import mongoose from 'mongoose';
import Book from "../models/Book.js"
import bookExcerpts from '../utils/bookExcerpts.js'

export const getBookExcerpt = async (req, res) => {
    try {
        const excerpt = bookExcerpts[Math.floor(Math.random()*bookExcerpts.length)]

        const wordCount = excerpt.split(" ").length

        res.status(200).json(excerpt)
    } catch (error) {
        res.status(404).json(error)
    }
}
