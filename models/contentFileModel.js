const mongoose = require("mongoose")
const contentFileSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        chapter:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chapter"
        },
        pdf:{
            type:String,
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