const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            lowercase:true
        },
        email:{
            type: String,
            lowercase:true,
        },
        password:{
            type:String,    
        },
        token:{
            type: String,
            default:null
        },
        createdBy:{
            type: String,
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }, 
    {   timestamps:true }
);

const Users = mongoose.model("User",userSchema)
module.exports = Users;