const express = require("express")
const mongoose = require("mongoose")
const router  = express.Router();
const Course = require("../models/courseModel")
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Language = require("../models/languageModel")
const ObjectId = require("mongoose").Types.ObjectId
const  {HTTPStatusCode,ErrorMessages} =  require("../global.ts")
console.log(ErrorMessages. USER_EXIST);

router.post('/course/createCourse', async(req,res) =>{
    const { 
            name,
            categoryId,
            subCategoryId,
            programmingLanguageId,
            level,
            overview,
            description,
            content,
            requirement,
            price,
            discount,
            languageId,
            deadline,
            courseImg,
            file,
            review,
            instructor,
            video
        } = req.body;
    try {

        const category = await Category.findById({_id:categoryId});
        const subCategory = await Subcategory.findById({_id:subCategoryId});
        const language = await Language.findById({_id:languageId});
        const programmingLanguage = await ProgrammingLanguage.findById({_id:programmingLanguageId})
        const courseExist = await Course.findOne({name:name})
        if(courseExist){
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message: ErrorMessages.COURSE_EXIST,
            })
        }
        const courseCreate = await Course.create({
            name:name,
            overview:overview,
            description:description,
            requirement:requirement,
            category:category,
            subCategory:subCategory,
            programmingLanguage:programmingLanguage,
            price:price,
            discount:discount,
            level:level,
            language:language,
            deadline:deadline
        }) 
        return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message: ErrorMessages.CREATED,
                    data: courseCreate
                })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({ message:ErrorMessages.INTERNAL_SERVER,
                    error:error.message
            })
    }
})
//Get All Data
router.get('/getAllCourse', async(req,res) =>{
    try {
        const getAllCourse = await Course.find()
        return res
            .status(HTTPStatusCode.OK)
            .json({
                message: ErrorMessages.GETDATA,
                data: getAllCourse
            })
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})

//Get Single Course
router.get('/course/:id', async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const getSingleCourse = await Course.findById({_id:id})
            if(getSingleCourse){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: getSingleCourse
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
             .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Update Course
router.patch('/course/update/:id', async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const courseUpdate = await Course.findByIdAndUpdate(id, req.body, {
                new:true
            })
            if(courseUpdate){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.UPDATED,
                        data: courseUpdate
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
             .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Delete Course
router.delete('/course/delete/:id', async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const courseDelete = await Course.findByIdAndDelete({_id:id});
            if(courseDelete){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.DELETED,
                        data: courseDelete
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
             .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
module.exports = router;