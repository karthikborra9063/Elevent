import express from 'express';

import protectRoute from '../middleware/protectRoute.js';
import updateRouter from './updateRouter.js';

const router = express.Router();

router.use('/update/:eventId',protectRoute,updateRouter)
router.post('/create',protectRoute,createEvent)
router.post('/update/:eventId',protectRoute,updateEvent);
export default router;