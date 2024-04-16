const mongoose = require("mongoose")
const subCategorySchema = mongoose.Schema(
    {
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        subCategoryName:{
            type:String,
            require:[true,"Please Enter name of subcategory"]
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        updatedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    },
    {timestamps:true}
)
const Subcategorys = mongoose.model("Subcategory",subCategorySchema)
module.exports = Subcategorys;