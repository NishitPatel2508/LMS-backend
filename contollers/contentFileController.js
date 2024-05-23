const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const app = express();
const Category = require("../models/categoryModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const ContentFile = require("../models/contentFileModel")
const Instructor = require("../models/instructorModel");
const Chapter = require('../models/chapterModel');
const Course = require("../models/courseModel")
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadFileController =  async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    const {chapter,pdf} = req.body
    try{
        const instructorExist = await Instructor.findById({_id:userid})

        if(instructorExist){
            const chapterInfo = await Chapter.findById({_id:chapter});
            const uploadFiles = await ContentFile.create({
                chapter:chapterInfo,
                name:req.file.originalname,
                // pdf:req.file.path,
                // pdf:`http://localhost:${process.env.PORT}/uploads/${req.file.originalname}`,
                createdBy:instructorExist
            })
            console.log(uploadFiles);
            console.log(req.file);
            return res.status(HTTPStatusCode.CREATED)
                        .json({
                            data:uploadFiles,
                            message: ErrorMessages.UPLOAD_SUCCESS
                        })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.BAD_REQUEST)
        .json({
            message:ErrorMessages.NOT_FOUND,
            message1: error.message
        })
    }
}

const getAllContentFileController = async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllFile = await ContentFile.find({createdBy:userid})
            if(getAllFile){
                for (const field of getAllFile) {
                    const chapter = field.chapter;
                    const chapterInfo = await Chapter.findById({_id:chapter})
                    if(chapterInfo){
                        field.chapter = chapterInfo;
                        if(chapterInfo){
                            const course  = chapterInfo.course;
                            if(course){
                                const courseInfo = await Course.findById({_id:course})
                                field.chapter.course = courseInfo;
                            }
                        }
                    }
                }
                return res.status(HTTPStatusCode.OK)
                            .json({
                                data:getAllFile,
                                message: ErrorMessages.GETDATA
                            })
            }
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.BAD_REQUEST)
        .json({
            message:ErrorMessages.NOT_FOUND,
            message1: error.message
        })
    }   
}

const getSingleContentFileController = async(req,res) =>{
    const userid = req.user.id;
    const id = req.params.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const getSingleFile = await ContentFile.findById({_id:id})
                if(getSingleFile){
                    const chapterInfo = await Chapter.findById({_id:getSingleFile.chapter})
                    if(chapterInfo){
                        getSingleFile.chapter = chapterInfo;
                    }
                    return res.status(HTTPStatusCode.OK)
                                .json({
                                    data:getSingleFile,
                                    message: ErrorMessages.GETDATA
                                })
                } else {
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_FOUND
                    })
                }
            } else{
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
            message:ErrorMessages.NOT_FOUND,
            message1: error.message
        })
    }   
}
const updateContentFileController = async(req,res) =>{
    console.log(req.file);
    const userid = req.user.id;
    const id = req.params.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const updatedFile = await ContentFile.findByIdAndUpdate(id,{name:req.file.originalname,pdf:req.file.path},{
                    new:true
                })
                console.log(updatedFile);
                if(updatedFile){

                    return res.status(HTTPStatusCode.OK)
                                .json({
                                    data:updatedFile,
                                    message: ErrorMessages.UPDATED
                    })
                }else {
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_FOUND
                    })
                }
            }else{
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
            message:ErrorMessages.NOT_FOUND,
            message1: error.message
        })
    }   
}
const deleteContentFileController = async(req,res) =>{
    const userid = req.user.id;
    const id = req.params.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){

                const deletedFile = await ContentFile.findByIdAndDelete({_id:id})
                if(deletedFile){

                    return res.status(HTTPStatusCode.OK)
                                .json({
                                    data:deletedFile,
                                    message: ErrorMessages.DELETED
                    })
                }else {
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_FOUND
                    })
                }
            }else{
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
            message:ErrorMessages.NOT_FOUND,
            message1: error.message
        })
    }   
}

module.exports = {uploadFileController,getAllContentFileController,getSingleContentFileController,updateContentFileController,deleteContentFileController}