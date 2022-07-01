import express from 'express'
import auth from '../middleware/auth.js'
import pointVerify from '../middleware/point-verify.js'
import { signup, signin, getUserInfo, deleteUser, updateUser, follow, unfollow, requestPasswordReset, resetPassword } from '../controllers/users.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/request-password-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.post('/get-info', auth, getUserInfo)
router.post('/update', auth, pointVerify, updateUser)
router.post('/delete', auth, deleteUser)
router.post('/follow', auth, follow)
router.post('/unfollow', auth, unfollow)

export default router