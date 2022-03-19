import express from 'express'
import auth from '../middleware/auth.js'

import { fetchUsers, fetchVisitedUser } from '../controllers/all-users.js';
import { fetchVisitedUserBooks } from '../controllers/books.js';

const router = express.Router()

router.post('/fetch-users', auth, fetchUsers)
router.post('/fetch-visited-user', fetchVisitedUser)
router.post('/fetch-visited-user-books', fetchVisitedUserBooks)

export default router