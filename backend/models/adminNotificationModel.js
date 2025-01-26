import mongoose from "mongoose";

const adminNotficationSchema = new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'fromType'
    },
    fromType:{
        type:String,
        enum:['Organizer','Attendee','Admin'],
        required:true
    },
    subject:{
        type:String,
        required:true,
        maxLength:50
    },
    message:{
        type:String,
        required:true,
    }
})

export default mongoose.model('AdminNotification',adminNotficationSchema);