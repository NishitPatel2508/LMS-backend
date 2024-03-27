const mongoose = require("mongoose")
const chapterSchema = mongoose.Schema(
    {
        chapterName:{
            type: String,
            require: [true,"Please, Enter name of chapter"]
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

const chapters = mongoose.model("Chapter",chapterSchema)
module.exports = chapters