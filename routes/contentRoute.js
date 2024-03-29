const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Content = require("../models/contentModel")
const Course = require("../models/courseModel")
const Chapter = require('../models/chapterModel');
const ContentVideo = require('../models/contnetVideoModel');
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")

// Create By using Id of Particular Course
router.post('/content/create', async(req,res) => {
    try {
        const {  
                course,
                chapter,
                contentVideo,    
            } = req.body
        const courseID = await Course.findById({_id:course})
        const chapterDetailes = await Chapter.findById({_id:chapter})
        const contentVideoID = await ContentVideo.findById({_id:contentVideo})
        //Chapter is Exist in Content MODEL
        if(chapterDetailes._id == chapter){
            return res
            .status(HTTPStatusCode.BAD_REQUEST)
            .json({
                 message: ErrorMessages.CONTENT_EXIST
            }) 
        }
        //Content Video is Exist in Content MODEL
        if(contentVideoID == contentVideo){
            return res
            .status(HTTPStatusCode.BAD_REQUEST)
            .json({
                 message: ErrorMessages.CONTENT_VIDEO_EXIST
            }) 
        }
        
        if(chapterDetailes.course._id == course){
            const createContent = await Content.create({
                courseDetailes:courseID,
                chapterDetailes:chapterDetailes,
                contentVideoDetailes:contentVideoID
            })
            return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message:ErrorMessages.CREATED,
                    data: createContent,
                 })
        }
        else{
            return res
            .status(HTTPStatusCode.BAD_REQUEST)
            .json({
                 message: ErrorMessages.INVALID_CHAPTER
            }) 
        }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message: ErrorMessages.INTERNAL_SERVER,
                error: error.message
        })
    }
})
router.get('/getAllContent', async(req,res) => {
    try {
        const getAllContent = await Content.find()
        if(getAllContent){
            for(const field of getAllContent) {
                const courseInfo = await Course.findById({_id:field.courseDetailes})
                if(courseInfo){
                    field.courseDetailes = courseInfo
                }
                const chapter = await Chapter.findById({_id:field.chapterDetailes})
                if(chapter){
                    console.log(chapter.course);
                    field.chapterDetailes = chapter
                }
                const contentVideo = await ContentVideo.findById({_id:field.contentVideoDetailes})
                if(contentVideo){
                    field.contentVideoDetailes = contentVideo
                }
               
            }

        }        
        return res
            .status(HTTPStatusCode.OK)
            .json({
                message: ErrorMessages.GETDATA,
                data: getAllContent
            })
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Get Single Content
router.get('/content/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const getSingleContent = await Content.findById({_id:id})
            if(getSingleContent){
                const course = await Course.findById({_id:getSingleContent.courseDetailes})
                if(course){
                    getSingleContent.courseDetailes = course
                }
                const chapter = await Chapter.findById({_id:getSingleContent.chapterDetailes})
                if(chapter){
                    getSingleContent.chapterDetailes = chapter
                }
                const contentVideo = await ContentVideo.findById({_id:getSingleContent.contentVideoDetailes})
                if(contentVideo){
                    getSingleContent.contentVideoDetailes = contentVideo
                }
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: getSingleContent
                    })
            }   
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                         message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
                
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Update Content
router.patch('/content/update/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const contentUpdate = await Content.findByIdAndUpdate(id, req.body, {
                new:true
            })
            if(contentUpdate){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.UPDATED,
                        data: contentUpdate
                    })
            }   
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                         message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
              
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Delete Content
router.delete('/content/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const contentDelete = await Content.findByIdAndDelete({_id:id})
            if(contentDelete){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.DELETED,
                        data: contentDelete
                    })
            }   
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                         message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
               
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
module.exports = router;