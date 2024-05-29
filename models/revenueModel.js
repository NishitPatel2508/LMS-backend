const mongoose = require("mongoose")
const revenueSchema = mongoose.Schema(
    {
        totalRevenue :{
            type:Number,
        },
        courseAmount:{
            type:Number,
        },
        instructorInfo:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
        },
        courseInfo:{
            // type: mongoose.Schema.Types.ObjectId,
            // ref:"Course"
            type:String
        },
        buyDate:{
            type: Date
        },
        userInfo:{
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
        }
    }, {timestamps:true}
)

const Revenue = mongoose.model("Revenue",revenueSchema)
module.exports = Revenue;