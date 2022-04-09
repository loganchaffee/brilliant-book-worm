import express from 'express'
import { createPost, fetchPosts, likePost, dislikePost } from '../controllers/posts.js'

const router = express.Router()

router.get('/', fetchPosts)
router.post('/', createPost)
router.post('/like-post', likePost)
router.post('/dislike-post', dislikePost)

export default router