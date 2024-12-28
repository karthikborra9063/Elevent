import express from 'express';

import protectRoute from '../middleware/protectRoute';
import { simpleUpdate,criticalUpdate } from '../controller/updateEventController';


const router = express.Router();

router.post('/simple',protectRoute,simpleUpdate);
router.post('/critical',protectRoute,criticalUpdate);

export default router;