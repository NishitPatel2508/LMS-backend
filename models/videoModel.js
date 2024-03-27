const mongoose = require("mongoose")
const videoSchema = mongoose.Schema(
    {
        thumbnail:{
            type: String,
            require: [true, "Please, Enter thubnail of video"]
        },
        videoLink:{
            type: String,
            require: [true, "Please, upload Video related content"]
        },
        preview:{
            type: Boolean,
            require: [true, "Please, preview is required or not."]
        },
        uploadBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
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

const Videoes = mongoose.model("Video",videoSchema)
module.exports = Videoes