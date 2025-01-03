import express from 'express';

import {listApprovePedingEvents,listApprovedEvents,listCancledEvents,listCompletedEvents,listOrganizers,deleteOrganizer} from '../controller/adminController.js'
import { approveEvent,cancelEvent,approveAdmin,rejectAdmin}  from '../controller/superAdminController.js';

const router = express.Router();

router.get('/ApprovePendingEvents',listApprovePedingEvents);
router.get('/ApprovedEvents',listApprovedEvents);
router.get('/CanceledEvents',listCancledEvents);
router.get('/CompletedEvents',listCompletedEvents);
router.get('/organizers',listOrganizers);
router.delete('/deleteOrganizer',deleteOrganizer);
router.put('/:eventId/ApproveEvent',approveEvent);
router.put('/:eventId/CancelEvent', cancelEvent);
router.put('/:userId/approveAdmin',approveAdmin);
router.put('/:userId/rejectAdmin', rejectAdmin);
export default router;
