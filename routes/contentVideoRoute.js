const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const ContentVideo = require("../models/contnetVideoModel")
const Course = require("../models/courseModel")
const Chapter = require('../models/chapterModel');
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Language = require("../models/languageModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
//Create
router.post('/contentvideo/create', async(req,res) => {
    const {chapter,videoLink,thumbnail} = req.body;
    
    const chapterInfo = await Chapter.findById({_id:chapter});
        
    // console.log(chapterInfo);
    


    // const videoLinkExist = await ContentVideo.findOne({videoLink:videoLink})
    // if(videoLinkExist){
    //     return res
    //         .status(HTTPStatusCode.BAD_REQUEST)
    //         .json({
    //             message: ErrorMessages.VIDEO_EXIST})
    // }
  try {
   
    const contentVideoCreate = await ContentVideo.create({
        chapterDetailes:chapterInfo,
        thumbnail:thumbnail,
        videoLink:videoLink
    })
    return res
            .status(HTTPStatusCode.CREATED)
            .json({
                message:ErrorMessages.CREATED,
                data:contentVideoCreate
            })
  } catch (error) {
    return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({
            message: ErrorMessages.INTERNAL_SERVER,
            error:error.message
    })
  }

})

//Get All Data
router.get('/getAllContentVideo' , async(req,res) =>{
    try {
        const getAllContentVideo = await ContentVideo.find()
        if(getAllContentVideo){
            for (const field of getAllContentVideo) {
                console.log(field.chapterDetailes);
                // console.log("object");
                const chapterInfo = await Chapter.findById({_id:field.chapterDetailes});
                field.chapterDetailes=chapterInfo
                if(chapterInfo){
                    const courseInfo = await Course.findById({_id:chapterInfo.course})
                    field.chapterDetailes.course = courseInfo
                    const fieldsOfCourse = field.chapterDetailes.course
                    
                    // console.log(fieldsOfCourse.category);
                    const category = await Category.findById({_id:fieldsOfCourse.category})
                    if(category){
                        fieldsOfCourse.category = category
                    }
                    const subCategory = await Subcategory.findById({_id:fieldsOfCourse.subCategory})
                    if(subCategory){
                        fieldsOfCourse.subCategory = subCategory
                    }
                    const programmingLanguage = await ProgrammingLanguage.findById({_id: fieldsOfCourse.programmingLanguage})
                    if(programmingLanguage){
                        fieldsOfCourse.programmingLanguage = programmingLanguage
                    }
                    const language = await Language.findById({_id:fieldsOfCourse.language})
                    if(language){
                        fieldsOfCourse.language = language;
                    }
                }
            }
        }
        // console.log(getAllContentVideo.chapterDetailes.chapterName);
        return res
            .status(HTTPStatusCode.OK)
            .json({
                message:ErrorMessages.GETDATA,
                data: getAllContentVideo
            })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})

// Get Single Data
router.get('/contentvideo/:id' ,async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const getSingleVideo = await ContentVideo.findOne({_id:id})
            if(getSingleVideo){
                return res
                    .status(HTTPStatusCode.OK)
                .   json({
                        message:ErrorMessages.GETDATA,
                        data:getSingleVideo
                    })
            } else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
            .       json({
                        message:ErrorMessages.NOT_FOUND
                    })
            }
        } else{
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
                    error:error.message
                })
        }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})

//Update
router.patch('/contentvideo/update/:id', async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const contentVideoExist = await ContentVideo.findOne({_id:id})
            if(contentVideoExist){
                const contentVideoUpdate = await ContentVideo.findByIdAndUpdate(id, req.body,{
                    new:true
                })
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message:ErrorMessages.UPDATED,
                        data: contentVideoUpdate
                    })
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_FOUND
                    })
            }
        } else {
            return res
                    .status(HTTPStatusCode.INTERNAL_SERVER)
                    .json({
                        message:ErrorMessages.WRONG_CREDENTIALS
                    }) 
          
        }
    } catch (error) {
        return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.NOT_FOUND
                })
    }
})

//Delete
router.delete('/contentvideo/delete/:id', async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const contentVideoExist = await ContentVideo.findOne({_id:id})
            if(contentVideoExist){
                const contentVideoDelete = await ContentVideo.findByIdAndDelete({_id:id})
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message:ErrorMessages.DELETED,
                        data: contentVideoDelete
                    })
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_FOUND
                    })
            }
        } else {
           
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS
                }) 
        }
    } catch (error) {
        return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.NOT_FOUND
                })
    }
})
module.exports = router;