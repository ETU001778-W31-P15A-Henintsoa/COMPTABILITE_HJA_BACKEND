import { Router } from 'express';
import { getDocumentsNumber, insertInput } from '../controllers/inputController.js';

const router = Router();

// Routes
router.post('/nombre-pieces', getDocumentsNumber);
router.post('/insertion-saisie', insertInput);

export default router;
