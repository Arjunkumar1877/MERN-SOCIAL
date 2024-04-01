import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import {  getFeedPost, getUserPosts, likePost } from '../controllers/post.js'
const router = express.Router();

router.post("/", verifyToken, getFeedPost)
router.get("/:userId/posts", verifyToken, getUserPosts)


router.patch("/:id/like", verifyToken, likePost)

export default router;