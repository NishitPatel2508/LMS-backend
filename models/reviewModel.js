const mongoose = require("mongoose")
const reviewSchema = mongoose.Schema(
    {
        userDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        courseDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        rate:{
            type:Number,
            require:[true,"Please, give ratings out of 5."]
        },
        experience:{
            type:String,
            require:[true,"Please Share yoour experience regarding this."]
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)
const Reviews = mongoose.model("Review",reviewSchema);
module.exports = Reviews;