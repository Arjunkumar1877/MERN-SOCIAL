import express from 'express';
import { verifyToken } from '../middlewares/auth';
const router = express.Router();



// READ
router.get('/:id', verifyToken, )
router.get('/:id/friends', verifyToken, )



// UPDATE
router.patch("/:id/friendId", verifyToken, )



export default router;


