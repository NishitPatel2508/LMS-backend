const mongoose = require("mongoose")
const express = require("express")
const router =express.Router()
const Video = require("../models/videoModel")
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
//Create
router.post('/video/create',authenticateToken, async(req,res) => {
    const {videoLink,thumbnail,preview,createdBy} = req.body;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const videoLinkExist = await Video.findOne({videoLink:videoLink})
            if(videoLinkExist){
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.VIDEO_EXIST})
            }
            const VideoCreate = await Video.create({
                thumbnail:thumbnail,
                videoLink:videoLink,
                preview:preview,
                createdBy:instructorExist
            })
            return res
                    .status(HTTPStatusCode.CREATED)
                    .json({
                        message:ErrorMessages.CREATED,
                        Video:VideoCreate
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

//Get All Data
router.get('/getAllVideo' ,authenticateToken, async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllVideo = await Video.find()
            return res
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.GETDATA,
                    Video: getAllVideo
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

// Get Single Data
router.get('/video/:id' ,authenticateToken,async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const getSingleVideo = await Video.findOne({_id:id})
                if(getSingleVideo){
                    return res
                        .status(HTTPStatusCode.OK)
                    .   json({
                            message:ErrorMessages.GETDATA,
                            Video:getSingleVideo
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
})

//Update
router.patch('/video/update/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const VideoExist = await Video.findOne({_id:id})
                if(VideoExist){
                    const VideoUpdate = await Video.findByIdAndUpdate(id, req.body,{
                        new:true
                    })
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message:ErrorMessages.UPDATED,
                            Video: VideoUpdate
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
})

//Delete
router.delete('/video/delete/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const VideoExist = await Video.findOne({_id:id})
                if(VideoExist){
                    const VideoDelete = await Video.findByIdAndDelete({_id:id})
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message:ErrorMessages.DELETED,
                            Video: VideoDelete
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
})

module.exports = router;