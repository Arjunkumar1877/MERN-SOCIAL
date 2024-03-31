import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { addRemoveFriend, getUSerFirends, getUser } from '../controllers/users.js';
const router = express.Router();



// READ
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUSerFirends);


// UPDATE
router.patch("/:id/friendId", verifyToken, addRemoveFriend);



export default router;


