const mongoose = require("mongoose")
const paymentSchema = mongoose.Schema(
    {
        userDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        courseDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        paymentId:{
            type:String
        },
        orderId:{
            type:String 
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
const Payment = mongoose.model("Payment",paymentSchema);
module.exports = Payment;