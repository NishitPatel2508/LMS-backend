const mongoose = require("mongoose")
const newPasswordSchema = mongoose.Schema({
    newPassword:{
        type:String
    }
})
const newPasswordOfUser = mongoose.model("Newpassword",newPasswordSchema)
module.exports = newPasswordOfUser;