import mongoose from "mongoose";
const attendeeSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,  
        required:true
    },
    mobileNumber:{
        type:String, 
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventRegistration'
    }],
},
{timestamps:true});
const Attendee=mongoose.model("attendees",attendeeSchema);
export default Attendee;