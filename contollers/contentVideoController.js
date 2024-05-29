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
const Instructor = require("../models/instructorModel");
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
//Create
const createContentVideoController = async(req,res) => {
    const {chapter,videoLink,thumbnail,createdBy} = req.body;
    const chapterInfo = await Chapter.findById({_id:chapter});
    // console.log(chapterInfo);
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const videoLinkExist = await ContentVideo.findOne({videoLink:videoLink})
            if(videoLinkExist){
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.VIDEO_EXIST})
            }
            else {

                const contentVideoCreate = await ContentVideo.create({
                    chapter:chapterInfo,
                    thumbnail:thumbnail,
                    videoLink:videoLink,
                    createdBy:instructorExist
                })
                return res
                        .status(HTTPStatusCode.CREATED)
                        .json({
                            message:ErrorMessages.CREATED,
                            data:contentVideoCreate
                        })
            }
        }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message: ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }

}

//Get All Data
const getAllContentVideoController = async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllContentVideo = await ContentVideo.find({createdBy:userid})
            if(getAllContentVideo){
                for (const field of getAllContentVideo) {
                    // console.log(field.chapterDetailes);
                    // console.log("object");
                    const chapterInfo = await Chapter.findById({_id:field.chapter});
                    field.chapter=chapterInfo
                    if(chapterInfo){
                        const courseInfo = await Course.findById({_id:chapterInfo.course})
                        field.chapter.course = courseInfo
                        const fieldsOfCourse = field.chapter.course

                        // console.log(fieldsOfCourse.category);
                        // const category = await Category.findById({_id:fieldsOfCourse.category})
                        // if(category){
                        //     fieldsOfCourse.category = category
                        // }
                        // const subCategory = await Subcategory.findById({_id:fieldsOfCourse.subCategory})
                        // if(subCategory){
                        //     fieldsOfCourse.subCategory = subCategory
                        // }
                        // const programmingLanguage = await ProgrammingLanguage.findById({_id: fieldsOfCourse.programmingLanguage})
                        // if(programmingLanguage){
                        //     fieldsOfCourse.programmingLanguage = programmingLanguage
                        // }
                        // const language = await Language.findById({_id:fieldsOfCourse.language})
                        // if(language){
                        //     fieldsOfCourse.language = language;
                        // }
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
            }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
}

// Get Single Data
const getSingleContentVideoController = async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const getSingleVideo = await ContentVideo.findOne({_id:id})
                if(getSingleVideo){
                    const chapterInfo = await Chapter.findById({_id:getSingleVideo.chapter});
                    if(chapterInfo){
                        getSingleVideo.chapter=chapterInfo
                    }
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
        }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
}
//Update
const updateContentVideoController = async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
        }
    } catch (error) {
        return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.NOT_FOUND
                })
    }
}

//Delete
const deleteContentVideoController = async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
        }
    } catch (error) {
        return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.NOT_FOUND
                })
    }
}
module.exports = {  createContentVideoController,
                    getAllContentVideoController,
                    getSingleContentVideoController,
                    updateContentVideoController,
                    deleteContentVideoController};