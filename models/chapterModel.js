const mongoose = require("mongoose")
const chapterSchema = mongoose.Schema(
    {
        course:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        chapterName:{
            type: String,
            require: [true,"Please, Enter name of chapter"]
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
        }
    },
    { timestamps:true }  
)

const chapters = mongoose.model("Chapter",chapterSchema)
module.exports = chapters