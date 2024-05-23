const mongoose = require("mongoose")
const contentVideoSchema = mongoose.Schema(
    {
        chapter:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chapter"
        },
        thumbnail:{
            type: String,
            require: [true, "Please, Enter thubnail of video"]
        },
        videoLink:{
            type: String,
            require: [true, "Please, upload video related content"]
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

const ContentVideoes = mongoose.model("ContentVideo",contentVideoSchema)
module.exports = ContentVideoes