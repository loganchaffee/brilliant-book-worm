import express from 'express'
import { getBookExcerpt } from '../controllers/readingTest.js'

const router = express.Router()
router.get('/', getBookExcerpt)

export default router 