const mongoose = require("mongoose")
const testSchema = mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        content:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Content"
        },
        marks:{
            type:Number,
        },
        grade:{
            type:String
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
const Tests = mongoose.model("Test",testSchema);
module.exports = Tests;