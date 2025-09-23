import { Router } from 'express';
import { findRapports } from '../controllers/rapportController.js';

const router = Router();

// Routes
router.post('/', findRapports);

export default router;
