import express from 'express'
import auth from '../middleware/auth.js'

import { fetchNotifications, markNotificationAsRead } from '../controllers/notifications.js'
 
const router = express.Router()

router.get('/', auth, fetchNotifications)
router.post('/mark-as-read', auth, markNotificationAsRead)

export default router