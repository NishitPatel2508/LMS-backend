const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
//Create
router.post("/programmingLanguage/create", async(req,res) =>{
    const { programmingLanguageName} = req.body;
    try{
        const programmingLanguageExistCheck = await ProgrammingLanguage.findOne({ programmingLanguageName: programmingLanguageName})
        if(programmingLanguageExistCheck){
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.PROGRAMMING_LANGUAGE_EXIST})
        }
        const createProgrammingLanguage = await ProgrammingLanguage.create({
            programmingLanguageName: programmingLanguageName
        })
        return res
            .status(HTTPStatusCode.CREATED)
            .json({message:ErrorMessages.CREATED,
                ProgrammingLanguage:createProgrammingLanguage 
            })
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get All data
router.get('/getAllProgrammingLanguage', async(req,res) =>{
    try{
        const getAllProgrammingLanguage = await ProgrammingLanguage.find()
        return res
             .status(HTTPStatusCode.OK)
             .json({message:ErrorMessages.GETDATA,
                ProgrammingLanguage:getAllProgrammingLanguage
        })
    }catch{
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get Single Data
router.get('/programmingLanguage/:id' , async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const singleProgrammingLanguage = await ProgrammingLanguage.findOne({_id:id})
            if(singleProgrammingLanguage){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.GETDATA,
                        ProgrammingLanguage:singleProgrammingLanguage
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
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
    
})

//Update
router.patch('/programmingLanguage/update/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const updateProgrammingLanguage = await ProgrammingLanguage.findByIdAndUpdate(id, req.body,
                {
                    new:true
                }
            )
           if(updateProgrammingLanguage){
                return res
                .status(HTTPStatusCode.OK)
                .json({message:ErrorMessages.UPDATED,
                    ProgrammingLanguage:updateProgrammingLanguage
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
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Delete
router.delete('/programmingLanguage/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const deleteProgrammingLanguage = await ProgrammingLanguage.findByIdAndDelete(id)
           if(deleteProgrammingLanguage){
                return res
                .status(HTTPStatusCode.OK)
                .json({message:ErrorMessages.DELETED,
                    ProgrammingLanguage:deleteProgrammingLanguage
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
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
module.exports = router;