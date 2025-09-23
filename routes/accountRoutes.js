import { Router } from 'express';
import { findAccounts } from '../controllers/accountController.js';

const router = Router();

// Routes
router.post('/', findAccounts);

export default router;
