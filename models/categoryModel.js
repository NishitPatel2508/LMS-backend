const mongoose = require("mongoose")
const categorySchema = mongoose.Schema(
    {
        categoryName:{
            type: String,
            require: [true,"Please, Enter name of category"]
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
        }
    }, {timestamps:true}
)

const Categorys = mongoose.model("Category",categorySchema)
module.exports = Categorys;