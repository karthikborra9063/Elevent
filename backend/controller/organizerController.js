import bcrypt from "bcrypt";

import organizer from "../models/organizer_model";
import event from "../models/eventModel.js"


export const updateOrganizer = async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        const userId = req.user._id;
        let user = await organizer.findById(userId);
        if(!user){
            return res.status(404).json({message:"organizer not found"});
        }
        const isMatched = await bcrypt.compare(password,user?.password);
        if(isMatched){
            return res.status(400).json({message:"Enter new password"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password length should be atleast 6 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        user.username = username||user.username;
        user.email= email||user.email;
        user.password=hashPassword||user.password;
        user = await user.save();
        user.password = null;
        return res.status(200).json(user);
    }
    catch(err){
        console.error(`Error occured at update organizer`);
        return res.status(500).json({error:`Internal error - ${err.message}`});
    }
}
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
        console.log({
            eventname,category
        })

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
            currentAttendees,
            speakers,
            services,
            sponsers
        })

        await newEvent.save();
        return res.status(200).json({success:"Successful"});
        
    }catch(err){
        console.log(`Error occured at createEvent controller`);
        return res.status(500).json({error:`Internal error has occured - ${err}`});
    }
}