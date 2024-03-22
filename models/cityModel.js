const mongoose = require("mongoose")
const citySchema = mongoose.Schema(
    {
        stateId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        cityName:{
            type:String,
            require:[true,"Please Enter name of city"]
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
const Cities = mongoose.model("City",citySchema)
module.exports =  Cities;