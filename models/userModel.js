const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
          
            lowercase:true
        },
        lastName:{
            type: String,
            
            lowercase:true
        },
        gender:{
            type: String,
       
            lowercase:true
         
        },
        email:{
            type: String,
         
            unique:[true, "emailid is already exist."],
            lowercase:true,
        
        },
        password:{
            type:String,    
        },
        mobile:{
            type:String,
            unique:[true, "Phone Number is already exist."],   
        },
        address:{
            type: String,
            min:[5,'Address must be greter than 5 characters'],
            max:[50,'Address must be smaller than 50 characters']
        },
        city:{
            type: String,
            
        },
        state:{
            type: String,
           
        },
        country:{
            type: String,
            
        },
        pincode:{
            type: String,
          
        },
        userType:{
            type:String,
            default:'student'
        },
        purchaseDate:{
            type: Date,
        },
        certificate:{
            type: String,
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