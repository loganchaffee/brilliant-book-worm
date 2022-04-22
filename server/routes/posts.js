import express from 'express'
import { createPost, fetchPosts, likePost, dislikePost, createComment, deleteComment } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, fetchPosts)
router.post('/', auth, createPost)
router.post('/like-post', auth, likePost)
router.post('/dislike-post', auth, dislikePost)
router.post('/create-comment', auth, createComment)
router.post('/delete-comment', auth, deleteComment)

export default router