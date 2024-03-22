const mongoose = require("mongoose")
const contentFileSchema = mongoose.Schema(
    {
        ppt:{
            type: String
        },
        pdf:{
            type: String,
            require: [true, "Please, upload PDF related content"]
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

const ContentFiles = mongoose.model("ContentFile",contentFileSchema)
module.exports = ContentFiles