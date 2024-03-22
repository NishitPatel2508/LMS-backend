const mongoose = require("mongoose")
const certificateSchema = mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        dateOfIssue:{
            type:Date,
            default: Date.now 
        },  
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        updatedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)
const Certificates = mongoose.model("Certificate",certificateSchema);
module.exports = Certificates;