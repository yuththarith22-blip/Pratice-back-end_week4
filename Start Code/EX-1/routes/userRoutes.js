import { Router } from 'express';
import {
    createNewUser,
    getUser,
    getUsers,
    removeUser,
    updateExistingUser
} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createNewUser);
router.put('/:id', updateExistingUser);
router.delete('/:id', removeUser);

export default router;