const mongoose = require("mongoose")
const programmingLanguageSchema = mongoose.Schema(
    {
        subCategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Subcategory"
        },
        programmingLanguageName:{
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

const ProgrammingLanguages = mongoose.model("ProgrammingLanguage",programmingLanguageSchema)
module.exports = ProgrammingLanguages;