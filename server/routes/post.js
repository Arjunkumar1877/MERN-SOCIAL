import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { createPost } from '../controllers/post.js'
const router = express.Router();

router.post("/", verifyToken, createPost)
router.get("/:userId/posts", verifyToken, )


router.patch("/:id/like", verifyToken, )

export default router;