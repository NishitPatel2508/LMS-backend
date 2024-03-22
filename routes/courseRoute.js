const express = require("express")
const mongoose = require("mongoose")
const router  = express.Router();
const Course = require("../models/courseModel")
const ObjectId = require("mongoose").Types.ObjectId
const  {HTTPStatusCode,ErrorMessages} =  require("../global.ts")
console.log(ErrorMessages. USER_EXIST);

router.post('/course/createCourse', async(req,res) =>{
    const {name,category,overview,description,content,requirement,price,discount,
    language,level,courseImg,deadline,file,review,instructor,video} = req.body;
})