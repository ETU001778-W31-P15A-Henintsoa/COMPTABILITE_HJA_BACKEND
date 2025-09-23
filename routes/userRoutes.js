import { Router } from 'express';
import { loginUser, insertUser, getAllUsers, updateUser } from '../controllers/userController.js';

const router = Router();

// Routes
router.post('/connexion', loginUser);
router.post('/create', insertUser);
router.get('/allUsers', getAllUsers);
router.post('/update', updateUser);

export default router;
