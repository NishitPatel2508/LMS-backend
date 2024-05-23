const  mongoose  = require("mongoose");

const instructorSchema = mongoose.Schema(
    {
        courseDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        name:{
            type:String,
            // require:[true,"Please, Enter name of Instructor"]
        },
        email:{
            type:String,
            // require:[true,"Please, Enter name of Instructor"]
        },
        password:{
            type:String,
            // require:[true,"Please, Enter name of Instructor"]
        },
        gender:{
            type: String,
            lowercase:true
        },
        mobile:{
            type:String,
            // unique:[true, "Phone Number is already exist."],   
        },
        profileImg:{
            type:String,
            // require:[true,"Please, Uplaod image of Instructor"]
        },
        experience:{
            type:String,
            // require:[true,"Please, Enter the experience of the field of instructor"]
        },
        about:{
            type:String,
            // require:[true,"Please, Enter about yourself"]
        },
        linkedin:{
            type:String,
            // require:[true,"Please, Share the link of instructor's LinkedIn Profile"]
        },
        instagram:{
            type:String,
            // require:[true,"Please, Share the link of instructor's Instagram Profile"]
        },
        twitter:{
            type:String,
            // require:[true,"Please, Share the link of instructor's X Profile"]
        },
        discord:{
            type:String,
            // require:[true,"Please, Share the link of instructor's discord Profile"]
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