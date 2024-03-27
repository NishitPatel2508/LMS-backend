const mongoose = require("mongoose")
const contentSchema = mongoose.Schema(
    {
        
        chapterId:{
            type: mongoose.Schema.Types.Array,
            ref:"Chapter"
        },
        contentFileId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"contnetFile"
        },
        contentVideoId:{
            type: mongoose.Schema.Types.Array,
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