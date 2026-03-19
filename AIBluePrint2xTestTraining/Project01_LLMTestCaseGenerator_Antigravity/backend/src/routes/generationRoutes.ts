import { Router } from 'express';
import { generateTestCases } from '../controllers/generationController';

const router = Router();

router.post('/', generateTestCases);

export default router;
