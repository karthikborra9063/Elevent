import organizer from "../models/organizer_model.js";
import eventModel from "../models/eventModel.js";

export const simpleUpdate = async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const userId = req.user._id;
        // in simple update many things come into the picture
        // ---> 1) services
        const {speakers,services,sponsers} = req.body;
        // const {images,banner} = req.body;
        const event =await eventModel.findById(eventId);
        if(!event){
            return res.status(404).json({notFound: `Event not found`});
        }
        const orga =await organizer.findById(userId);
        if(!orga){
            return res.status(404).json({notFound: `Organizer not found`});
        }
        if(speakers){
            const mergedSpeakers = [...new Set([...speakers,...event.speakers])];
            event.speakers=mergedSpeakers;
        }
        if(services){
            const mergedServices = [...new Set([...services,...event.services])];
            event.services=mergedServices;
        }
        if(sponsers){
            const mergedSponsers = [...new Set([...sponsers,...event.sponsers])];
            event.sponsers=mergedSponsers;
        }
        if(roar){
            event.roar=roar;
        }
        // if(images){
        //     Array.prototype.push.apply(event.images, images);
        // }
        // if(banner){
        //     event.banner = banner;
        // }
        await event.save();
        return res.status(200).json({success:`Event updated successfully`});
    }catch(err){
        console.log(`Error occured at simple update event`);
        return res.status(500).json({message: `Internal error occured - ${err.message}`});
    }
}
export const criticalUpdate = async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const userId = req.user._id;
        const {startDate, endDate,venue,address,price,maxAttendees} = req.body;
        const { street, city, state, postalCode, country } = address;
        const event = await eventModel.findById(eventId);
        if(!event){
            return res.status(404).json({Notfound:"event not found"});
        }
        const org = organizer.findById(userId);
        if(!org){
            return res.status(404).json({Notfound:"organizer not found"});
        }
        if(startDate&&endDate){
            const differenceInMs = endDate - startDate;
            const differenceInHours = differenceInMs / (1000 * 60 * 60);
            if(differenceInHours>3){
                // Make the cancelation policy applicable fot 100% refund
            }
            else{
                event.startDate=startDate;
                event.endDate=endDate;
                event.roar=`The event is delayed for ${differenceInHours} sorry for inconvience`;
            }
        }
        if(venue&&address){
            // Make the cancelation policy applicable fot 100% refund
            event.venue=venue;
            event.address=address;
        }
        if(maxAttendees){
            if(maxAttendees>event.maxAttendees){
                event.maxAttendees=maxAttendees;
            }
            else{
                // becareful mail transefer for inconvinience
            }
        }
    }catch(err){
        console.log(`Error occured at critical update event`);
        return res.status(500).json({message: `Internal error occured - ${err.message}`});
    }
}