import express from 'express'
import { createPost, fetchPosts, likePost, dislikePost, createComment } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, fetchPosts)
router.post('/', auth, createPost)
router.post('/like-post', auth, likePost)
router.post('/dislike-post', auth, dislikePost)
router.post('/create-comment', auth, createComment)

export default router