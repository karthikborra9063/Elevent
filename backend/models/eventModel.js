import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    eventname:{
        type:String,
        required:true,
        unique:true,
    },
    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organizer'
    },
    category:{
        type:String,
        required:true,
    },
    startDate:{
        type:mongoose.Schema.Types.Date,
        required:true,
    },
    endDate:{
        type:mongoose.Schema.Types.Date,
        required:true,
    },
    duration:{
        type:Number,
    },
    venue:{
        type:String,
        required:true,
    },
    address: {
        street: { type: String, required: true }, 
        city: { type: String, required: true },   
        state: { type: String, required: true },  
        postalCode: { type: String, required: true }, 
        country: { type: String, required: true },
    },
    eventType:{
        type:String,
        enum:['public','private'],
        required:true,
        default:'public',
    },
    ticketsRequired:{
        type:Boolean,
        default:false,
    },
    price:{
        type:Number,
        default:0,
    },
    maxAttendees:{
        type:Number,
        required:true,
    },
    currentAttendees:{
        type:Number,
        default:0,
    },
    // images:[{
    //     type:String,
    // }],
    // banner:{
    //     type:String,
    //     required:true,
    // },
    speakers:[{
        type:String,
    }],
    services:[{
        type:String}
    ],
    sponsers:[{
        type:String,
    }],
    status:{
        type:String,
        enum:['pending','approoved','cancled','completed'],
        default:"pending"
    },
    roar:{
        type:String,
        default:"Event not started yet"
    }
    // attedees:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'attendees'
    // }]
},{timestamps:true})
eventSchema.pre('save', function(next){
    if(this.startDate&&this.endDate){
        this.duration=this.endDate-this.startDate;
        if(this.duration<=0){
            return next(new Error("End date must be after the start date"));
        }
    }
    next();
})
const event = mongoose.model('event',eventSchema);
export default event