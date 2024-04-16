const express = require("express")
const mongoose = require("mongoose")
const router  = express.Router();
const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel")
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Language = require("../models/languageModel")
const ObjectId = require("mongoose").Types.ObjectId
const  {HTTPStatusCode,ErrorMessages} =  require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const jwt = require("jsonwebtoken")
// console.log(ErrorMessages. USER_EXIST);

router.post('/course/createCourse',authenticateToken,async(req,res) =>{
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
            video,
            createdBy
        } = req.body;
        const userid = req.user.id;
        console.log(userid);
        try{
            const category = await Category.findById({_id:categoryId});
            const subCategory = await Subcategory.findById({_id:subCategoryId});
            const language = await Language.findById({_id:languageId});
            const programmingLanguage = await ProgrammingLanguage.findById({_id:programmingLanguageId})
            const courseExist = await Course.findOne({name:name})
            const instructorExist = await Instructor.findById({_id:userid})
            if(instructorExist){
                
                if(courseExist){
                    return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({
                            message: ErrorMessages.COURSE_EXIST,
                    })
                }
            
                const courseCreate = await Course.create({
                    //Model Name : Value of that Field
                    name:name,
                    overview:overview,
                    description:description,
                    requirement:requirement,
                    category:category,
                    subCategory:subCategory,
                    programmingLanguage:programmingLanguage,
                    language:language,
                    price:price,
                    discount:discount,
                    level:level,
                    deadline:deadline,
                    createdBy:instructorExist
                }) 
                return res
                        .status(HTTPStatusCode.CREATED)
                        .json({
                            message: ErrorMessages.CREATED,
                            data:courseCreate

                        })
            }else {
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                            message:ErrorMessages.EMAIL_DOES_NOT_EXIST,
                            
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
//Get All Data
router.get('/getAllCourse',authenticateToken, async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try {
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            console.log(instructorExist);
            const getAllCourse = await Course.find({createdBy: userid});
            for (const fieldNames of getAllCourse) {
                const category = await Category.findById({_id:fieldNames.category})
                if(category){
                    fieldNames.category = category
                }
                const subCategory = await Subcategory.findById({_id:fieldNames.subCategory})
                if(subCategory){
                    fieldNames.subCategory = subCategory
                }
                const programmingLanguage = await ProgrammingLanguage.findById({_id:fieldNames.programmingLanguage})
                if(programmingLanguage){
                    fieldNames.programmingLanguage = programmingLanguage
                }
                const language = await Language.findById({_id:fieldNames.language});
                if(language){
                    fieldNames.language = language
                }
            }
            return res
                .status(HTTPStatusCode.OK)
                .json({
                    message: ErrorMessages.GETDATA,
                    data: getAllCourse
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

//Get Single Course
router.get('/course/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try {
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const getSingleCourse = await Course.findOne({createdBy: userid})
                if(getSingleCourse){
                        const category = await Category.findById({_id:getSingleCourse.category})
                        if(category){
                            getSingleCourse.category = category
                        }
                        const subCategory = await Subcategory.findById({_id:getSingleCourse.subCategory})
                        if(subCategory){
                            getSingleCourse.subCategory = subCategory
                        }
                        const programmingLanguage = await ProgrammingLanguage.findById({_id:getSingleCourse.programmingLanguage})
                        if(programmingLanguage){
                            getSingleCourse.programmingLanguage = programmingLanguage
                        }
                        const language = await Language.findById({_id:getSingleCourse.language});
                        if(language){
                            getSingleCourse.language = language
                        }
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
router.patch('/course/update/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id;
    console.log(req.body,"idddddd")
    const userid = req.user.id;
    console.log(userid);
    try {
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                console.log(instructorExist);
                // if(getSingleCourse){
                    const courseUpdate = await Course.findByIdAndUpdate(id,req.body, {
                        new:true
                    })
                    console.log("cu",courseUpdate);
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
                }
                else{
                    return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({
                            message: ErrorMessages.NOT_EXISTS
                        }) 
                }
              
            // } else {
            //     return res
            //             .status(HTTPStatusCode.INTERNAL_SERVER)
            //             .json({
            //                 message:ErrorMessages.WRONG_CREDENTIALS,
            //             })
            // }
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
router.delete('/course/delete/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id
    const userid = req.user.id;
    console.log(userid);
    try {
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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