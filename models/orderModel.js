const mongoose = require("mongoose")
const orderSchema = mongoose.Schema(
    {
        userDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        amount:{
            type: Number
        },
        order_id:{
            type:String 
        },
        razorpay_payment_id:{
            type:String,
            default:null
        },
        razorpay_order_id:{
            type:String,
            default:null
        },
        razorpay_signature:{
            type:String,
            default:null
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
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;