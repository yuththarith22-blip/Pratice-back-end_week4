import { Router } from 'express';
import { getAllJournalists, getJournalistById } from '../controllers/journalistsController.js';

const router = Router();

router.get('/', getAllJournalists);
router.get('/:id', getJournalistById);

export default router;