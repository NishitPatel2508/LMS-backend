const mongoose = require("mongoose")
const languageSchema = mongoose.Schema(
    {
        
        languageName:{
            type: String,
            require: [true,"Please, Enter name of language"]
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }, {timestamps:true}
)

const Languages = mongoose.model("Language", languageSchema)
module.exports = Languages;