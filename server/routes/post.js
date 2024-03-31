import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
const router = express.Router();

router.get("/", verifyToken, )
router.get("/:userId/posts", verifyToken, )


router.patch("/:id/like", verifyToken, )

export default router;