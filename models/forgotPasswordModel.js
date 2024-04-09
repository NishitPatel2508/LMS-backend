const mongoose = require("mongoose")
const forgotPasswordSchema = mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:String
    }
   
})
const ForgetPassword = mongoose.model("ForgotPassword",forgotPasswordSchema)
module.exports = ForgetPassword