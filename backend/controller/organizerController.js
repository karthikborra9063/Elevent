import bcrypt from "bcrypt";

import organizer from "../models/organizerModel.js";
import event from "../models/eventModel.js"
import organizerNotification from "../models/organizerNotificationModel.js";
import adminNotification from "../models/adminNotificationModel.js"

export const updateOrganizer = async (req, res) => {
    try {
        const { username, email, password, mobileNumber, address, profileImg, coverImage, experience, acheivments, about } = req.body;
        const userId = req.user._id;
        let user = await organizer.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Organizer not found" });
        }
        if (password && password.length < 6) {
            return res.status(400).json({ message: "Password length should be at least 6 characters" });
        }
        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.address = address || user.address;
        user.profileImg = profileImg || user.profileImg;
        user.coverImage = coverImage || user.coverImage;
        user.experience = experience || user.experience;
        user.acheivments = acheivments || user.acheivments;
        user.about = about || user.about;
        if (hashPassword) {
            user.password = hashPassword;
        }
        user = await user.save();
        user.password = null;
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: `Internal error - ${err.message}` });
    }
};
export const createEvent = async (req,res)=>{
    const {eventname,category,startDate,endDate,venue,address,eventType,ticketsRequired,price,maxAttendees} = req.body;
    const {speakers,services,sponsers} = req.body;
    // let {images,banner} = req.body;
    const { street, city, state, postalCode, country } = address;


    const organizerId = req.user._id;

    try{
        let org = organizer.findById(organizerId);
        if(!org){
            return res.status(404).json({message:"User not found"});
        }
        if(!eventname){
            return res.status(404).json({message:"Eventname is mandatory"});
        }
        if(!category){
            return res.status(404).json({message:"categoty is mandatory"});
        }
        if(!startDate){
            return res.status(404).json({message:"event start date is mandatory"});
        }
        if(!street){
            return res.status(404).json({message:"event street should be provided"});
        }
        if(!city){
            return res.status(404).json({message:"event  city should be provided"});
        }
        if(!postalCode){
            return res.status(404).json({message:"event postal code should be provided"});
        }
        if(!state){
            return res.status(404).json({message:"event state should  be provided"});
        }
        if(!country){
            return res.status(404).json({message:"event country should be provided"});
        }
        if(!ticketsRequired){
            return res.status(404).json({message:"Mention event is ticket oriented (or) not"});
        }
        if(!price){
            return res.status(404).json({message:"Mention the fair for entry"});
        }
        if(!maxAttendees){
            return res.status(404).json({message:"Enter the maximum number of attendees for the event"});
        }
        if(!speakers){
            return res.status(404).json({message:"Mention speakers for the event(promotional purpose)"});
        }
        if(!sponsers){
            return res.status(404).json({message:"Enter the sponsers list of the event(promotional purpose)"});
        }

        const newEvent =new event({
            eventname,
            category,
            startDate,
            endDate,
            venue,
            address,
            eventType,
            ticketsRequired,
            price,
            maxAttendees,
            speakers,
            services,
            sponsers
        })
        newEvent.organizer=organizerId;
        await newEvent.save();
        // await org.events.push(newEvent._id.toString());
        const subject = `${eventname} - created successfully`;
        const message = "Your event has been successfully created! 🎉 Attendees can now view and register for your event. Thank you for using our platform to bring your event to life!";
        const notifyOrganizer =new organizerNotification({
            to:organizerId,
            from:'Elevent',
            fromType:'Elevent',
            subject:subject,
            message:message,
        })
        await notifyOrganizer.save();
        return res.status(200).json({success:"Successful"});
        
    }catch(err){
        console.log(`Error occured at createEvent controller`);
        return res.status(500).json({error:`Internal error has occured - ${err}`});
    }
}
export const eventList =async (req, res) => {
    try{
        const userId = req.user._id;
        if(!userId){
            return res.status(404).json({notFound:"User not found"});
        }
        const events =await event.findMany({organizer:userId});
        return res.status(200).json({"events":events});
    }catch(err){
        console.log(`Error occured at eventList Controller`);
        return res.status(500).json({error:`Internal error has occured - ${err}`});
    }
}
export const getMe = async (req, res) => {
    try{

        const userId = req.user._id;
        if(!userId){
            return res.status(404).json({notFound:"User not found"});
        }
        const user  = await organizer.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({notFound:"User not found"})
        }
        return res.status(200).json({user});

    }catch(err){
        console.log(`Error has occured at organizer get me functions`);
        return res.status(500).json({error:`Internal error has occured -${err}`})
    }
}
export const getName = async (req, res) => {
    try{

        const userId = req.user._id;
        if(!userId){
            return res.status(404).json({notFound:"User not found"});
        }
        const user  = await organizer.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({notFound:"User not found"})
        }
        return res.status(200).json({organizerName:user.username});

    }catch(err){
        console.log(`Error has occured at organizer get me functions`);
        return res.status(500).json({error:`Internal error has occured -${err}`})
    }
}
export const getNotifications = async (req, res) => {
    try{
        userId = req.user._id;
        if(!userId){
            return res.status(404).json({notFound:"User not found"});
        }
        const notifications = await organizerNotification.findById({to:userId}).populate('from');
        return res.status(200).json(notifications);
    }catch(err){
        console.log(`Error has occured at organizer get notifications`);
        return res.status(500).json({error:`Internal error has occured -${err}`})
    }
}
export const writeMessageToAdmin = async (req, res) => {
    try{
        const {subject,message} = req.body;
        const organizerId = req.user._id;
        const orga = await organizer.findById(organizerId);
        if(!orga){
            return res.status(400).json({notFound:"organizer not found"});
        }
        const notify = new adminNotification({
            to:"Admin",
            from:organizerId,
            fromType:'Organizer',
            subject,
            message
        })
        await notify.save();
        return res.status(200).json({sent:"Message sent to the Admin"});
    }catch(err){
        console.log(`Error occured at writeMessageToAdmin - ${err}`);
        return res.status(500).json({err:"Internal error occured"});
    }
}