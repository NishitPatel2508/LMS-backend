const mongoose = require("mongoose")
const countrySchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        countryName:{
            type:String,
            require:[true,"Please Enter name of country"]
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
    {timestamps:true}
)
const Countries = mongoose.model("Country",countrySchema)
module.exports = Countries;