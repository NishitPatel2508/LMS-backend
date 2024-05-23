const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const Language = require("../models/languageModel")
const Instructor = require("../models/instructorModel");
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
//Create
const createLanguageController =  async(req,res) =>{
    const {languageName,createdBy} = req.body;
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const singlelanguage = await Language.findOne({languageName:languageName})
            if(singlelanguage){
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.LANGUAGE_EXIST})
            }
            const createLanguage= await Language.create({
                languageName:languageName,
                createdBy:instructorExist
            })
            return res
                .status(HTTPStatusCode.CREATED)
                .json({message:ErrorMessages.CREATED,
                    data:createLanguage
                })
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
}

//Get All data
const  getAllLanguagesController =   async(req,res) =>{
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllLanguages = await Language.find()
            return res
                 .status(HTTPStatusCode.OK)
                 .json({message:ErrorMessages.GETDATA,
                    data:getAllLanguages
            })
        }
    }catch{
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER})
    }
}

//Get Single Data
const  getSingleLanguagesController =    async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const singleLanguage = await Language.findOne({_id:id})
                if(singleLanguage){
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({message:ErrorMessages.GETDATA,
                            data:singleLanguage
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
    
}

//Update
const  updateLanguageController =    async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const updateLanguage = await Language.findByIdAndUpdate(id, req.body,
                    {
                        new:true
                    }
                )
               if(updateLanguage){
                    return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.UPDATED,
                        data:updateLanguage
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
}

//Delete
const deleteLanguageController =  async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const deleteLanguage = await Language.findByIdAndDelete(id)
               if(deleteLanguage){
                    return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.DELETED,
                        data:deleteLanguage
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
}
module.exports = {createLanguageController,getAllLanguagesController,getSingleLanguagesController,updateLanguageController,deleteLanguageController};