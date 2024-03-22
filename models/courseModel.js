const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "Please, Enter a course name"],
            lowercase:true
        },
        category:{
            type: String,
            required:[true, "Please, Enter a category name"],
            lowercase:true
        },
        overview:{
            type: String,
            required:[true, "Please, write overview"],
            lowercase:true
        },
        description:{
            type: String,
            required:[true, "Please, enter description"],
            lowercase:true
        },
        content:{
            type: String,
            required:[true, "Please, content of course"],
            lowercase:true
        },
        requirement:{
            type: String,
            required:[true, "Please, Enter requirement of course"],
            lowercase:true
        },
        price:{
            type: Number,
            required:[true, "Please, Enter a price of course"],
           
        },
        discount:{
            type: Number,
        },
        language:{
            type: String,
            required:[true, "Please, Enter a language of course"],
        },
        level:{
            type: String,
            required:[true, "Please, Enter a level of course"],
            enum:["Expert","Intermediate","Beginner"]
        },
        courseImg:{
            type:String,
            required:[true, "Please, Upload Image of Course"],
        },
        deadline:{
            type: Date,
            required:[true, "Please, deadline of Course"],
        },
        file:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"File"
        },
        review:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        },
        instructor:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Instructor"
        },
        video:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video"
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    }, {timestamps:true}
);

const Courses =  mongoose.model("Course",courseSchema)
module.exports = Courses;