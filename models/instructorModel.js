const  mongoose  = require("mongoose");

const instructorSchema = mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        name:{
            type:String,
            require:[true,"Please, Enter name of Instructor"]
        },
        profileImg:{
            type:String,
            require:[true,"Please, Uplaod image of Instructor"]
        },
        experience:{
            type:String,
            require:[true,"Please, Enter the experience of the field of instructor"]
        },
        about:{
            type:String,
            require:[true,"Please, Enter about yourself"]
        },
        linkedin:{
            type:String,
            require:[true,"Please, Share the link of instructor's LinkedIn Profile"]
        },
        instagram:{
            type:String,
            require:[true,"Please, Share the link of instructor's Instagram Profile"]
        },
        twitter:{
            type:String,
            require:[true,"Please, Share the link of instructor's X Profile"]
        },
        discord:{
            type:String,
            require:[true,"Please, Share the link of instructor's discord Profile"]
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
);
const Instructors = mongoose.model("Instructor",instructorSchema)
module.exports = Instructors;