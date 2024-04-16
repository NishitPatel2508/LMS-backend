const mongoose = require("mongoose")
const instructorloginSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    },
}, {timestamps:true}
)

const instructorLogin = mongoose.model("InstructorLogin",instructorloginSchema)
module.exports = instructorLogin