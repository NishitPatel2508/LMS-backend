const mongoose = require("mongoose")
const express = require("express")
const ObjectId =  mongoose.Types.ObjectId;
const Chapter = require("../models/chapterModel")
const router = express.Router()
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")

//Create
router.post('/chapter/create' , async(req,res) =>{
    const {chapterName} = req.body
   
    try {
        const chapterExist = await Chapter.findOne({chapterName:chapterName})
        if(chapterExist){
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.CHAPTER_EXIST})
        }
        const createChapter = await Chapter.create({
            chapterName:chapterName
        })
        return res
            .status(HTTPStatusCode.CREATED)
            .json({
                message:ErrorMessages.CREATED,
                data:createChapter
            })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({ message:ErrorMessages.INTERNAL_SERVER,
                    error:error.message
            })
    }
})

//Get All Chapter
router.get('/getAllChapter' , async(req,res) =>{
    try{
        const getAllChapter = await Chapter.find()
        return res
            .status(HTTPStatusCode.OK)
            .json({
                message:ErrorMessages.GETDATA,
                data: getAllChapter
            })
    }
    catch(error){
        return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message: ErrorMessages.INTERNAL_SERVER,
                    error: error.message
                })
    }
})

//Get Single Contnent
router.get('/chapter/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const Chapterdetails = await Chapter.findOne({_id:id})
            if(Chapterdetails){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message: ErrorMessages.GETDATA,
                        data:Chapterdetails
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
                .status(HTTPStatusCode. BAD_REQUEST)
                .json({
                    message: ErrorMessages. WRONG_CREDENTIALS
                }) 
        }  
    }catch(error){
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                    message: ErrorMessages.INTERNAL_SERVER,
                    error: error.message
            })
    } 
    
})
//Update
router.patch('/chapter/update/:id', async(req,res) => {
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const ChapterUpdate = await Chapter.findByIdAndUpdate(id, req.body, {
                new:true
            })

            if(ChapterUpdate){
                return res
                .status(HTTPStatusCode.OK)
                .json({message: ErrorMessages.UPDATED,
                    data :ChapterUpdate
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
                .status(HTTPStatusCode. BAD_REQUEST)
                .json({
                    message: ErrorMessages. WRONG_CREDENTIALS
                }) 
        }  
    }catch(error){
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                    message: ErrorMessages.INTERNAL_SERVER,
                    error: error.message
            })
    } 
})

//Delete
router.delete('/chapter/delete/:id', async(req,res) => {
    const id = req.params.id;
    try{
            if(ObjectId.isValid(id)){
                const ChapterDelete = await Chapter.findByIdAndDelete({_id:id})
                if(ChapterDelete){
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message:ErrorMessages.DELETED,
                            contetn: ChapterDelete
                        })
                }
                else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_EXISTS
                    })
                }
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.WRONG_CREDENTIALS
                    }) 
            }
    }
    catch(error){
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER
            })
    }
})
module.exports = router;