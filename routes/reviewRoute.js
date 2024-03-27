const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Review = require("../models/reviewModel")
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")

//Create
router.post('/review/create', async(req,res) => {
    const {rate,experience} = req.body
    try {
        const createReview = await Review.create({
            rate: rate,
            experience:experience
        })
        return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message: ErrorMessages.CREATED,
                    data: createReview
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

//Get All Review
router.get('/getAllReview', async(req,res) =>{
    try {
        const getAllReview = await Review.find()
        return res
                .status(HTTPStatusCode.OK)
                .json({
                    message: ErrorMessages.GETDATA,
                    data: getAllReview
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

//Get Single Data
router.get('/review/:id', async(req,res) => {
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const getSingleReview = await Review.findOne({_id:id})
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
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message: ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})
//Update
router.patch('/review/update/:id', async(req,res) => {
    const id = req.params.id
    try {
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
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message: ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})
//Delete
router.delete('/review/delete/:id', async(req,res) => {
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
})
module.exports = router;