const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "Please, Enter a course name"],
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            // required:[true, "Please Enter a Category"],
            ref:"Category",
        },
        subCategory:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Subcategory",
        },
        chapter:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Chapter",
        },
        programmingLanguage:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"ProgrammingLanguage",
        },
        overview:{
            type: String,
            required:[true, "Please, write overview"],
        },
        description:{
            type: String,
            required:[true, "Please, enter description"],
        },
        content:{
            type: mongoose.Schema.Types.Array,
            // required:[true, "Please, content of course"],
            ref:"Content",
        },
        requirement:{
            type: String,
            required:[true, "Please, Enter requirement of course"],
        },
        price:{
            type: Number,
            required:[true, "Please, Enter a price of course"],
           
        },
        discount:{
            type: Number,
        },
        language:{
            type: mongoose.Schema.Types.ObjectId,
           // required:[true, "Please, Enter a language of course"],
            ref:"Language", 
        },
        level:{
            type: String,
            // required:[true, "Please, Enter a level of course"],
            enum:["Expert","Intermediate","Beginner"]
        },
        courseImg:{
            type:String,
            // required:[true, "Please, Upload Image of Course"],
        },
        deadline:{
            type: Date,
            // required:[true, "Please, deadline of Course"],
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