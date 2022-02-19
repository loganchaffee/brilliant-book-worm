import express from 'express'
import auth from '../middleware/auth.js'
import { getBooks, createBook, updateBook, deleteBook } from '../controllers/books.js'
const router = express.Router()

router.get('/', auth, getBooks)
router.post('/', createBook)
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router