import organizerModel from '../models/organizerModel.js'
import adminModel from '../models/adminModel.js'
import eventModel from '../models/eventModel.js'
import organizernotificationModel from '../models/organizerNotificationModel.js'

export const listApprovePedingEvents = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await adminModel.findById(adminId);
    
        if (!admin) {
            return res.status(401).json({ Unauthorized: `Unauthorized access to the admin page` });
        }
        const { search = "", page = 1, limit = 10 } = req.query;
        const query = {
            ...search && { username: { $regex: search, $options: "i" } },
            status: "pending" // Add condition for pending status
        };
        const pendingEvents = await eventModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const totalMatches = await eventModel.countDocuments(query);
        return res.json({
            events: pendingEvents,
            total: totalMatches
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching events." });
    }
}

export const listApprovedEvents = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await adminModel.findById(adminId);
        if (!admin) {
            return res.status(401).json({ Unauthorized: `Unauthorized access to the admin page` });
        }
        const { search = "", page = 1, limit = 10 } = req.query;
        const query = {
            ...search && { username: { $regex: search, $options: "i" } },
            status: "approved" 
        };
        const approvedEvents = await eventModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const totalMatches = await eventModel.countDocuments(query);
        return res.json({
            events: approvedEvents,
            total: totalMatches
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching events." });     
    }
}

export const listCancledEvents = async (req,res) =>{
    try {
        const adminId = req.user._id;
        const admin = await adminModel.findById(adminId);
    
        if (!admin) {
            return res.status(401).json({ Unauthorized: `Unauthorized access to the admin page` });
        }
    
        const { search = "", page = 1, limit = 10 } = req.query;
        const query = {
            ...search && { username: { $regex: search, $options: "i" } },
            status: "cancled" 
        };
        const canceledEvents = await eventModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const totalMatches = await eventModel.countDocuments(query);
        return res.json({
            events: canceledEvents,
            total: totalMatches
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching events." });
    }
}

export const listCompletedEvents = async (req, res) => {
    try {
        const adminId = req.user._id;
        const admin = await adminModel.findById(adminId);
    
        if (!admin) {
            return res.status(401).json({ Unauthorized: `Unauthorized access to the admin page` });
        }
    
        const { search = "", page = 1, limit = 10 } = req.query;
    
        
        const query = {
            ...search && { username: { $regex: search, $options: "i" } },
            status: "completed" 
        };
    
        const completedEvents = await eventModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
    
        const totalMatches = await eventModel.countDocuments(query);
    
        return res.json({
            events: completedEvents,
            total: totalMatches
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while fetching events." });
    }
}

export const listOrganizers = async (req, res) => {
    const adminId = req.user._id;
    if (!adminId) {
        return res.status(402).json({ invalid: "Invalid admin id" });
    }

    const admin = await adminModel.findById(adminId);
    if (!admin) {
        return res.status(404).json({ notFound: "Admin not found" });
    }

    const { search = "", page = 1, limit = 10 } = req.query; 

    try {
        const query = search
            ? { username: { $regex: search, $options: "i" } } 
            : {};

        const organizersList = await organizerModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalMatches = await organizerModel.countDocuments(query);

        return res.status(200).json({
            organizers: organizersList,
            currentPage: Number(page),
            totalPages: Math.ceil(totalMatches / limit),
            totalMatches,
        });
    } catch (error) {
        console.log(`Error occured at list organizers`);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteOrganizer = async (req, res) => {
    const adminId = req.user._id;
    if (!adminId) {
        return res.status(402).json({ invalid: "Invalid admin id" });
    }

    const admin = await adminModel.findById(adminId);
    if (!admin) {
        return res.status(404).json({ notFound: "Admin not found" });
    }
    try{
        const {username} = req.query;
        if(!username) {
            return res.status(400).json({provide:"provide valid user name"});
        }
        const organizer = await organizerModel.find(username).populate('-password');
        const organizerId = organizer._id;
        await organizernotificationModel.deleteMany({to:organizerId});
        await eventModel.deleteMany({organizer:organizerId});
        await organizerModel.deleteOne(username);
        return res.status(200).json({success:`No longer ${username} is an organizer`});
    }catch(err){
        console.log(`Error has occured at delete organizers`);
        return res.status(500).json({ error: "Internal server error" });
    }
}