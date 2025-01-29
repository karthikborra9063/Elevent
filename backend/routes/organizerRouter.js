import express from 'express';

import protectRoute from '../middleware/organizerProtectRoute.js';
import updateRouter from './updateRouter.js';
import {createEvent,eventList,getMe, updateOrganizer,getNotifications,getName} from '../controller/organizerController.js'

const router = express.Router();

router.use('/update',protectRoute,updateRouter);
router.post('/create-event',protectRoute,createEvent);
router.get('/events',protectRoute,eventList);
router.get('/profile',protectRoute,getMe);
router.post('/profile',protectRoute,updateOrganizer);
router.get('/notifications',protectRoute,getNotifications);
router.get('/getName',protectRoute,getName);
export default router;