const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Subcategory = require("../models/subcategoryModel")

// const InstructorLogin = require("../models/instructorLogin")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
//Create
router.post("/programmingLanguage/create",authenticateToken, async(req,res) =>{
    const { programmingLanguageName,subCategory,createdBy} = req.body;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const subCategoryInfo = await Subcategory.findById({_id:subCategory});
            const programmingLanguageExistCheck = await ProgrammingLanguage.findOne({ programmingLanguageName: programmingLanguageName})

            if(programmingLanguageExistCheck){  
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.PROGRAMMING_LANGUAGE_EXIST})
            }
            const createProgrammingLanguage = await ProgrammingLanguage.create({
                subCategory:subCategoryInfo,
                programmingLanguageName: programmingLanguageName,
                createdBy:instructorExist
            })
            return res
                .status(HTTPStatusCode.CREATED)
                .json({message:ErrorMessages.CREATED,
                    data:createProgrammingLanguage
                })
        } 
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get All data
router.get('/getAllProgrammingLanguage', authenticateToken,async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllProgrammingLanguage = await ProgrammingLanguage.find()
            for (const fieldNames of getAllProgrammingLanguage) {
                const subCategoryInfo = await Subcategory.findById({_id:fieldNames.subCategory})
                if(subCategoryInfo){
                    fieldNames.subCategory = subCategoryInfo
                }
            }
            return res
                 .status(HTTPStatusCode.OK)
                 .json({message:ErrorMessages.GETDATA,
                    data:getAllProgrammingLanguage
            })
        }
    }catch{
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get Single Data
router.get('/programmingLanguage/:id' ,authenticateToken, async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const singleProgrammingLanguage = await ProgrammingLanguage.findOne({_id:id})
                const subCategoryInfo = await Subcategory.findById({_id:singleProgrammingLanguage.subCategory})
                if(subCategoryInfo){
                    singleProgrammingLanguage.subCategory = subCategoryInfo
                }
                if(singleProgrammingLanguage){
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({message:ErrorMessages.GETDATA,
                            data:singleProgrammingLanguage
                        })
                }
                else{
                    return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({message:ErrorMessages.NOT_EXISTS})
                }
            }
            else{
                return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.WRONG_CREDENTIALS})
            }
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
    
})

//Update
router.patch('/programmingLanguage/update/:id',authenticateToken, async(req,res) =>{
    
    const id = req.params.id;
    const instructorid = req.user.id 
    try{
        const instructorInfo = await Instructor.findById({_id:instructorid})
        if(instructorInfo){
            if(ObjectId.isValid(id)){
                const updateProgrammingLanguage = await ProgrammingLanguage.findByIdAndUpdate(id,req.body,
                    {
                        new:true,   
                    }
                )
               if(updateProgrammingLanguage){
                    return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.UPDATED,
                        data:updateProgrammingLanguage
                    })
               }
               else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.NOT_EXISTS})
               }
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.WRONG_CREDENTIALS
                })
            }
        }

    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Delete
router.delete('/programmingLanguage/delete/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id;
    const instructorid = req.user.id 
    try{
        const instructorInfo = await Instructor.findById({_id:instructorid})
        if(instructorInfo){
        if(ObjectId.isValid(id)){
            const deleteProgrammingLanguage = await ProgrammingLanguage.findByIdAndDelete(id)
           if(deleteProgrammingLanguage){
                return res
                .status(HTTPStatusCode.OK)
                .json({message:ErrorMessages.DELETED,
                    data:deleteProgrammingLanguage
                })
           }
           else{
                return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.NOT_EXISTS})
           }
        }
        else{
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.WRONG_CREDENTIALS,
            })
        }
    }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
module.exports = router;