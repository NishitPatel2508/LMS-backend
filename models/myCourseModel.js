const mongoose = require("mongoose")
const mycourseSchema = new mongoose.Schema(
    {
        
        paymentId:{
            type:String
        },
        orderId:{
            type:String
        },
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    }, {timestamps:true}
);

const MyCourses =  mongoose.model("Mycourse",mycourseSchema)
module.exports = MyCourses;