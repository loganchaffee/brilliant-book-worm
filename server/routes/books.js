import express from 'express'
import auth from '../middleware/auth.js'
import pointVerify from '../middleware/point-verify.js'
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/books.js'

const router = express.Router()

router.get('/', auth, pointVerify, getBooks)
router.post('/', auth, createBook)
router.patch('/:id', auth, updateBook)
router.delete('/:id', auth, deleteBook)

export default router