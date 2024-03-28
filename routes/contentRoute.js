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
       
        let {courseId,chapterId,contentVideoId} = req.body
        const course= await Course.findById({_id:courseId})
        const chapter = await Chapter.findById({_id:chapterId})
        const video = await ContentVideo.findById({_id:contentVideoId})

        //Allow only chapter ids who matched with courseId provided by user
        // const allChapterId = await Chapter.aggregate([
        //     {
        //         $group:{
        //             _id:"$_id",
        //         },

        //         $match:{
        //             "chapterID" :{$courseId : courseId} //Error 
        //         }
        //     },
        // ])
   
        const createContent = await Content.create({
                courseId:courseId,
                chapterId:chapterId,
                contentVideoId:contentVideoId
        })
        return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message:ErrorMessages.CREATED,
                    data: createContent,
                })
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