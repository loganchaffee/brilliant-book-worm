import express from 'express'
import { fetchPosts, likePost, dislikePost, createComment, deleteComment, fetchPost, fetchUsersPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/users-post', auth, fetchUsersPost)
router.post('/single-post', auth, fetchPost)
router.post('/', auth, fetchPosts)
router.post('/like-post', auth, likePost)
router.post('/dislike-post', auth, dislikePost)
router.post('/create-comment', auth, createComment)
router.post('/delete-comment', auth, deleteComment)

export default router