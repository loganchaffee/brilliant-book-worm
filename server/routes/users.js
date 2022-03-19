import express from 'express'
import auth from '../middleware/auth.js'

import { signup, signin, getUserInfo, deleteUser, updateUser, follow, unfollow } from '../controllers/users.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/get-info', auth, getUserInfo)
router.post('/update', auth, updateUser)
router.post('/delete', auth, deleteUser)
router.post('/follow', auth, follow)
router.post('/unfollow', auth, unfollow)

export default router