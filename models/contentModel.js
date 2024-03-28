const mongoose = require("mongoose")
const contentSchema = mongoose.Schema(
    {
        
        courseId:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }],
        chapterId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chapter"
        }],
        contentFileId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"contnetFile"
        }],
        contentVideoId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"contnetVideo"
        }],
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