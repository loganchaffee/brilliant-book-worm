import express from 'express'
import auth from '../middleware/auth.js'

import { signup, signin, getUserInfo, deleteUser, updateUser, updateUserProfileImage } from '../controllers/users.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/get-info', auth, getUserInfo)
router.post('/update', auth, updateUser)
router.post('/update-profile-image', auth, updateUserProfileImage)
router.post('/delete', auth, deleteUser)

export default router