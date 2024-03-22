const mongoose = require("mongoose")
const stateSchema = mongoose.Schema(
    {
        countryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        stateName:{
            type:String,
            require:[true,"Please Enter name of state"]
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
const Stats = mongoose.model("State",stateSchema)
module.exports = Stats;