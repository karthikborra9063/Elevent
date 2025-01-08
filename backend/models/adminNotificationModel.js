import mongoose from "mongoose";

const adminNotficationSchema = new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.Mixed,
        require:true,
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'fromType'
    },
    fromType:{
        Type:String,
        enum:['Organizer','Attendee','Admin'],
        required:true
    },
    subject:{
        type:String,
        require:true,
        maxLength:50
    },
    message:{
        type:String,
        require:true,
    }
})

export default mongoose.model('AdminNotification',adminNotficationSchema);