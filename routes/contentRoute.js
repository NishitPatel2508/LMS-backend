const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Content = require("../models/contentModel")
const Course = require("../models/courseModel")
const Chapter = require('../models/chapterModel');
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Language = require("../models/languageModel")
const ContentVideo = require('../models/contnetVideoModel');
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")

// Create By using Id of Particular Course
router.post('/content/create', async(req,res) => {
    try {
        const {  
                course,
                chapter,    
            } = req.body
        const courseID = await Course.findById({_id:course})
        const chapterDetailes = await Chapter.findById({_id:chapter})
        if(courseID){
            const category = await Category.findById({_id:courseID.category})
            if(category){
                courseID.category = category
            }
            const subCategory = await Subcategory.findById({_id:courseID.subCategory})
            if(subCategory){
                courseID.subCategory = subCategory
            }
            const programmingLanguage = await ProgrammingLanguage.findById({_id: courseID.programmingLanguage})
            if(programmingLanguage){
                courseID.programmingLanguage = programmingLanguage
            }
            const language = await Language.findById({_id:courseID.language})
            if(language){
                courseID.language = language;
            }
        }
        const contentVideoAllInfo = await ContentVideo.find();
        const contentVideoInfo = []
        for (const field of contentVideoAllInfo) {
            if(field.chapterDetailes == chapter){
                    contentVideoInfo.push(field);
                    console.log(contentVideoInfo);
            }
        }
       
        //Chapter is Exist in Content MODEL
        // if(chapterDetailes._id == chapter){
        //     return res
        //     .status(HTTPStatusCode.BAD_REQUEST)
        //     .json({
        //          message: ErrorMessages.CONTENT_EXIST
        //     }) 
        // }
        //Content Video is Exist in Content MODEL
        // if(contentVideoID == contentVideo){
        //     return res
        //     .status(HTTPStatusCode.BAD_REQUEST)
        //     .json({
        //          message: ErrorMessages.CONTENT_VIDEO_EXIST
        //     }) 
        // }
        
        
            const createContent = await Content.create({
                courseDetailes:courseID,
                chapterDetailes:chapterDetailes,
                contentVideoDetailes:contentVideoInfo
            })
            return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message:ErrorMessages.CREATED,
                    data: createContent,
                 })
       
            // return res
            // .status(HTTPStatusCode.BAD_REQUEST)
            // .json({
            //      message: ErrorMessages.INVALID_CHAPTER
            // }) 
        
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
                const course = await Course.findById({_id:field.courseDetailes})
                if(course){
                    field.courseDetailes = course
                    const category = await Category.findById({_id:field.courseDetailes.category})
                    if(category){
                        field.courseDetailes.category = category
                    }
                    const subCategory = await Subcategory.findById({_id:field.courseDetailes.subCategory})
                    if(subCategory){
                        field.courseDetailes.subCategory = subCategory
                    }
                    const programmingLanguage = await ProgrammingLanguage.findById({_id: field.courseDetailes.programmingLanguage})
                    if(programmingLanguage){
                        field.courseDetailes.programmingLanguage = programmingLanguage
                    }
                    const language = await Language.findById({_id:field.courseDetailes.language})
                    if(language){
                        field.courseDetailes.language = language;
                    }
                }
                const chapter = await Chapter.findById({_id:field.chapterDetailes})
                if(chapter){
                    const course = await Course.findById({_id:chapter.course})
                    if(course){
                        chapter.course = course
                    }
                    field.chapterDetailes = chapter
                    // console.log(field.contentVideoDetailes);
                }

                // const contentVideo = await ContentVideo.find()
                // if(contentVideo){
                //     field.contentVideoDetailes.push(contentVideo)
                // }
                // let len = field.contentVideoDetailes.length
                
                const contentVideoAllInfo = await ContentVideo.find();
                console.log(contentVideoAllInfo.length);
                const idOfNotIncludVideo = contentVideoAllInfo.reverse()
                    for (const fieldOfContent  of idOfNotIncludVideo) { 
                        field.contentVideoDetailes.push(fieldOfContent)
                            if(contentVideoAllInfo.length === field.contentVideoDetailes.length){
                                break
                            }
                    }
                     
                    
                //     console.log(temp);
                //     for(const k of temp){
                //         for (const j of field.contentVideoDetailes) {
                //             if(field.contentVideoDetailes.includes(k) != true){
                //                 if(k.test(j)){
                //                     continue
                //                 } else {
                //                     field.contentVideoDetailes.push(k)
                //                 }
                                    
                                
                //             }
                           
                //         }
                //        
                // // if(field.contentVideoDetailes.includes(k) == false){           
                //     } 
                   
                
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
               
                const contentVideoAllInfo = await ContentVideo.find();
                const contentVideoInfo = []
                for (const field of contentVideoAllInfo) {
                    if(field.chapterDetailes == chapter){
                        contentVideoInfo.push(field);
                        getSingleContent.contentVideoDetailes = contentVideoInfo;
                        console.log(contentVideoInfo);
                    }
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