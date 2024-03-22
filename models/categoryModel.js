const mongoose = require("mongoose")
const categorySchema = mongoose.Schema(
    {
        categoryName:{
            type: String,
            require: [true,"Please, Enter name of category"]
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

const Categorys = mongoose.model("Category",categorySchema)
module.exports = Categorys;