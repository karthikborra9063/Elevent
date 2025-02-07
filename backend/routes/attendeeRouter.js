import express from 'express';
import protectRoute from '../middleware/attendeeProtectRoute.js';
import { eventRegistration, getMe, updateAttendee } from '../controller/attendeeController.js';
import  upload  from '../middleware/uploadMiddleware.js'; // Import the multer middleware for file uploads

const router = express.Router();
router.post('/register', protectRoute, eventRegistration);
router.get('/profile', protectRoute, getMe);
router.put(
    '/profile',
    protectRoute,
    upload.single('profileImg'), // Ensure this is not undefined
    updateAttendee // Ensure this is not undefined
  );
export default router;