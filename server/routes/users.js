import express from 'express'
import auth from '../middleware/auth.js'

import { signup, signin, getUserInfo } from '../controllers/users.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/get-info', auth, getUserInfo)

export default router