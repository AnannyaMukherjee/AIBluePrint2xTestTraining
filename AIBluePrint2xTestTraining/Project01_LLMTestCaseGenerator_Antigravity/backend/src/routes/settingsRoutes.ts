import { Router } from 'express';
import { getSettings, saveSettings, testConnection } from '../controllers/settingsController';

const router = Router();

router.get('/', getSettings);
router.post('/save', saveSettings);
router.post('/test', testConnection);

export default router;
