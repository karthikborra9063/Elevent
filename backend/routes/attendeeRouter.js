import express from 'express';
import protectRoute from '../middleware/attendeeProtectRoute.js';
import { createTicket, eventList, eventRegistration, getEvent, getMe, getName, myEventList, search, updateAttendee } from '../controller/attendeeController.js';
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });
const router = express.Router();
router.post('/events/:eventId/register', protectRoute, eventRegistration);
router.post('/storeticket', protectRoute, createTicket);
router.get('/profile', protectRoute, getMe);
router.get('/getname', protectRoute, getName);
router.get('/event-list', protectRoute, eventList);
router.get('/myevent-list', protectRoute, myEventList);
router.get(`/getevent/:eventId`,protectRoute,getEvent);
router.put(
    '/profileupdate',
    protectRoute,
    upload.single('profileImg'), // Ensure this is not undefined
    updateAttendee // Ensure this is not undefined
  );
  router.get('/search',protectRoute,search);
export default router;