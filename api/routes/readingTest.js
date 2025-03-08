import express from 'express'
import auth from '../middleware/auth.js'
import { getBookExcerpt } from '../controllers/readingTest.js'

const router = express.Router()
router.get('/', auth, getBookExcerpt)

export default router 