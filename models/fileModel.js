const mongoose = require("mongoose")
const fileSchema = mongoose.Schema(
    {   
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        ppt:{
            type: String
        },
        pdf:{
            type: String,
            require: [true, "Please, upload PDF related content"]
        },
        github:{
            type: String
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
    { timestamps:true }  
)

const Files = mongoose.model("File",fileSchema);
module.exports = Files;