import express from 'express';

import {listApprovePedingEvents,listApprovedEvents,listCancledEvents,listCompletedEvents,listOrganizers,deleteOrganizer, writeMessageToOrganizer,addArtist} from '../controller/adminController.js'
import { approveEvent,cancelEvent,approveAdmin,rejectAdmin}  from '../controller/superAdminController.js';

import adminProtectRoute from '../middleware/adminProtectRoute.js';
import superadminProtectRoute from '../middleware/superAdminProtectRoute.js';

const router = express.Router();

router.post('/:organizerId/message',adminProtectRoute,writeMessageToOrganizer);
router.post('/addArtist',adminProtectRoute,addArtist);
router.get('/ApprovePendingEvents',adminProtectRoute,listApprovePedingEvents);
router.get('/ApprovedEvents',adminProtectRoute,listApprovedEvents);
router.get('/CanceledEvents',adminProtectRoute,listCancledEvents);
router.get('/CompletedEvents',adminProtectRoute,listCompletedEvents);
router.get('/organizers',adminProtectRoute,listOrganizers);
router.delete('/deleteOrganizer',adminProtectRoute,deleteOrganizer);
router.put('/:eventId/ApproveEvent',superadminProtectRoute,approveEvent);
router.put('/:eventId/CancelEvent',superadminProtectRoute, cancelEvent);
router.put('/:adminId/approveAdmin',superadminProtectRoute,approveAdmin);
router.put('/:adminId/rejectAdmin', superadminProtectRoute,rejectAdmin);
export default router;
