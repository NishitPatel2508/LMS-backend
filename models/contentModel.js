const mongoose = require("mongoose")
const contentSchema = mongoose.Schema(
    {
        chapterName:{
            type: String,
            require: [true,"Please, Enter name of chapter"]
        },
        contentFileId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"contnetFile"
        },
        contentVideoId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"contnetVideo"
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