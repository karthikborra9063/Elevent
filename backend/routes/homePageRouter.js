import express from 'express';
import attendeeModel from '../models/attendeeModel.js';
import jwt from 'jsonwebtoken';
import { getTopBanners, getTopEvents, getEventDetails } from '../controller/homePageController.js';

const router = express.Router();

// Public Routes
router.get('/banners', getTopBanners);
router.get('/events', getTopEvents);

// Protected Route Middleware
const authenticateAttendee = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            next();
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'Attendee') {
            next();
        }

        const user = await attendeeModel.findById(decoded.userId).select('-password');
        if (!user) {
           next();
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
};

// Protected Route
router.get('/eventDetails/:eventId', authenticateAttendee, getEventDetails);

export default router;
