const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Review = require("../models/reviewModel")
const Course = require("../models/courseModel")
const User = require("../models/userModel")
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")

//Create
const createReviewController = async(req,res) => {
    const id = req.user.user;
    console.log(id);
    const { 
            course,
            rate,
            experience
        } = req.body;
    try {
        
        const userExist = await User.findOne({_id:id})
        if(userExist){
            const courseInfo = await Course.findById({_id:course})
            const createReview = await Review.create({
                userDetails:userExist,
                courseDetails:courseInfo,
                rate: rate,
                experience:experience
            })
            return res
                    .status(HTTPStatusCode.CREATED)
                    .json({
                        message: ErrorMessages.CREATED,
                        data: createReview
                    })
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

//Get All Review
const getAllReviewController = async(req,res) =>{
    const id = req.user.user;
    console.log(id);
    try {
        const userExist = await User.findById({_id:id})
        if(userExist){

            const getAllReview = await Review.find()
            for (const field of getAllReview) {
                const userInfo = await User.findById({_id:field.userDetails})
                if(userInfo){
                    field.userDetails = userInfo
                }
                const courseInfo = await Course.findById({_id:field.courseDetails})
                if(courseInfo){
                    field.courseDetails = courseInfo
                }
            }
            return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: getAllReview
                    })
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

const getSingleReviewController =  async(req,res) => {
    const id = req.params.id
    const userid = req.user.user;
    console.log(id);
    try {
        const userExist = await User.findById({_id:userid})
        if(userExist){
            if(ObjectId.isValid(id)){
                const getSingleReview = await Review.findOne({_id:id})
                const userInfo = await User.findById({_id:getSingleReview.userDetails})
                if(userInfo){
                    getSingleReview.userDetails = userInfo
                }
                const courseInfo = await Course.findById({_id:getSingleReview.courseDetails})
                if(courseInfo){
                    getSingleReview.courseDetails = courseInfo
                }
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: getSingleReview
                    })
            }else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.WRONG_CREDENTIALS
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
//Update
const updateReviewController = async(req,res) => {
    const id = req.params.id
    const userid = req.user.user;
    console.log(id);
    try {
        const userExist = await User.findById({_id:userid})
        if(userExist){
            if(ObjectId.isValid(id)){
                const reviewUpdate = await Review.findByIdAndUpdate(id, req.body, {
                    new:true
                })
                if(reviewUpdate){
                        return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message: ErrorMessages.UPDATED,
                            data: reviewUpdate
                        })
                } else {
                    return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({
                            message: ErrorMessages.NOT_EXISTS
                        })
                }     

            }else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.WRONG_CREDENTIALS
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
//Delete
const deleteReviewController =  async(req,res) => {
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const reviewDelete = await Review.findByIdAndDelete({_id:id})
            if(reviewDelete){
                return res
                .status(HTTPStatusCode.OK)
                .json({
                    message: ErrorMessages.DELETED,
                    data:reviewDelete
                })
            }else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.NOT_EXISTS
                    })
            }
        }else{
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message: ErrorMessages.WRONG_CREDENTIALS
                })
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

//Get All Review for Mycourse page
const getAllReviewForCoursePageController = async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.user;
    console.log("user",userid);
    console.log("aaaaa",id);
    try {
        const userExist = await User.findById({_id:userid})
        if(userExist){
            if(ObjectId.isValid(id)){
                const courseExist = await Course.findById({_id:id})
                if(courseExist){
                    const getAllReview = await Review.find({courseDetails:id})
                   
                    if(getAllReview){
                        for (const field of getAllReview) {
                            const userInfo = await User.findById({_id:field.userDetails})
                            if(userInfo){
                                userInfo.token = undefined
                                userInfo.password = undefined
                                userInfo.email = undefined
                                field.userDetails = userInfo
    
                            }
                            const courseInfo = await Course.findById({_id:field.courseDetails})
                            if(courseInfo){
                                courseInfo.courseImg = undefined
                                courseInfo.category = undefined
                                courseInfo.subCategory = undefined
                                courseInfo.programmingLanguage = undefined
                                courseInfo.language = undefined
                                field.courseDetails = courseInfo
                            }
                        }
                        return res
                                .status(HTTPStatusCode.OK)
                                .json({
                                    message: ErrorMessages.GETDATA,
                                    data: getAllReview
                                })
                    } else {
                        return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({
                            message: ErrorMessages.REVIEW_NOT,
                        })
                    }
                } else {
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.NOT_FOUND,
                    })
                }
            } else {
                return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message: ErrorMessages.INVALID_OBJECT_ID,
                    error: `${id} mmmm`
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
module.exports = {createReviewController,getAllReviewController,getSingleReviewController,updateReviewController, deleteReviewController,getAllReviewForCoursePageController };