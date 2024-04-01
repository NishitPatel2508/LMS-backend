const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Instructor = require("../models/instructorModel")
const Course = require("../models/courseModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")

//Create
router.post('/instructor/create', async(req,res) => {
    try {
        const { 
                courseId,
                name,
                experience,
                about,
                linkedin,
                instagram,
                twitter,
                discord
            } = req.body;
        const courseInfo = await Course.findById({_id:courseId})
        const instructorCreate = await Instructor.create({
            courseDetails:courseInfo,
            name:name,
            experience:experience,
            about:about,
            linkedin:linkedin,
            instagram:instagram,
            twitter:twitter,
            discord:discord
        })
        return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message: ErrorMessages.CREATED,
                    data: instructorCreate
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

//Get All
router.get('/getAllInstructor', async(req,res)=>{
    try {
        const getAllInstructor = await Instructor.find()
        if(getAllInstructor){
            for (const field of getAllInstructor) {
                const courseInfo = await Course.findById({_id:field.courseDetails})
                field.courseDetails= courseInfo
            }
        }
        return res  
            .status(HTTPStatusCode.OK)
            .json({
                message:ErrorMessages.GETDATA,
                data:getAllInstructor
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

//Get single Instructor
router.get('/instructor/:id', async(req,res) => {
    try {
        const id = req.params.id;
        if(ObjectId.isValid(id)){
            const getSingleInstructor = await Instructor.findById({_id:id});
            if(getSingleInstructor){
                const courseInfo = await Course.findById({_id:getSingleInstructor.courseDetails})
                getSingleInstructor.courseDetails = courseInfo;

                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: getSingleInstructor
                    })
            } else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_EXISTS,
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
router.patch('/instructor/update/:id', async(req,res) => {
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const instructorUpdate = await Instructor.findByIdAndUpdate(id, req.body, {
                new:true
            })
          
            if(instructorUpdate){
                const courseInfo = await Course.findById({_id:instructorUpdate.courseDetails})
                instructorUpdate.courseDetails = courseInfo;
                return res  
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.UPDATED,
                    data:instructorUpdate
                })
            }   else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_EXISTS,
                    })
            }

        } else    {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
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
//Delete
router.delete('/instructor/delete/:id', async(req,res) => {
    const id= req.params.id
    try {
        if(ObjectId.isValid(id)){
            const instructorDelete = await Instructor.findByIdAndDelete({_id:id})
            if(instructorDelete){
                return res  
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.DELETED,
                    data:instructorDelete
                })
            }   else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_EXISTS,
                    })
            }

        } else    {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
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
module.exports = router;