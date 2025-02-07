import Attendee from "../models/attendeeModel.js";
import EventRegistration from "../models/eventRegistrationModel.js";
import bcrypt from "bcrypt";

export const eventRegistration = async (req, res) => {
    try {
        const { eventName, eventDate } = req.body;
        const attendeeId = req.user._id;

        if (!eventName || !eventDate) {
            return res.status(400).json({ message: "Event name and date are required" });
        }

        // Create a new event registration
        const registration = await EventRegistration.create({
            eventName,
            eventDate,
            attendee: attendeeId
        });

        // Update the attendee's registered events list
        const attendee = await Attendee.findById(attendeeId);
        if (!attendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }
        attendee.registeredEvents.push(registration._id);
        await attendee.save();

        res.status(201).json({
            message: "Successfully registered for the event",
            registration
        });
    } catch (err) {
        console.error("Error registering for event:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(404).json({ message: "User ID not found" });
        }

        const user = await Attendee.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error("Error in getMe function:", err);
        res.status(500).json({ error: Internal server error - ${err.message} });
    }
};

export const updateAttendee = async (req, res) => {
    try {
        const { userName, email, password, mobileNumber } = req.body;
        const userId = req.user._id;
        const profileImg = req.file?.path; // Assuming file upload middleware adds the file path to req.file

        let user = await Attendee.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Attendee not found" });
        }

        // Hash the password if provided
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: "Password should be at least 6 characters" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Update other fields
        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.profileImg = profileImg || user.profileImg;

        // Save updated user
        user = await user.save();

        // Remove the password from the response
        user.password = undefined;

        res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (err) {
        console.error("Error updating attendee profile:", err);
        res.status(500).json({ error: Internal server error - ${err.message} });
    }
};

export const createTicket = async (req, res) => {
    try {
        const { eventId, bookingId, secretCode, qrCodeValue, attendeeId } = req.body;
        
        const eventExists = await Event.findById(eventId);
        if (!eventExists) {
            return res.status(404).json({ message: "Event not found" });
        }

        const attendeeExists = await Attendee.findById(attendeeId);
        if (!attendeeExists) {
            return res.status(404).json({ message: "Attendee not found" });
        }

        const ticket = new Ticket({ eventId, bookingId, secretCode, qrCodeValue, attendeeId });
        await ticket.save();
        
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate("eventId").populate("attendeeId");
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};