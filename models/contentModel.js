const mongoose = require("mongoose")
const contentSchema = mongoose.Schema(
    {
        courseDetailes:{ 
            type: mongoose.Schema.Types.Array,
            ref:"Course"
        },
        chapterDetailes:{
            type: mongoose.Schema.Types.Array,
            ref:"Chapter"
        },
        contentFileDetailes:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ContentFile"
        },
        contentVideoDetailes:{
            type: mongoose.Schema.Types.Array,
            ref:"ContentVideo"
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

const Contents = mongoose.model("Content",contentSchema)
module.exports = Contents