import mongoose from "mongoose";

const organizerSchema =new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    profileImg:{
        type:String,
        default:"",
    },
    // To keep tack of the all the events oranized by a organizer
    // eventId:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'',
    // }]
},{timestamp:true})
const organizer = mongoose.model('Organizer',organizerSchema);
export default organizer;