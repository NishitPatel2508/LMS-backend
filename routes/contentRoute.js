const mongoose = require("mongoose")
const express = require("express")
const ObjectId =  mongoose.Types.ObjectId;
const Content = require("../models/contentModel")
const router = express.Router()
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")

//Create
router.post('/content/create' , async(req,res) =>{
    const {chapterName} = req.body
    const contentExist = await Content.findOne({chapterName:chapterName})
    if(contentExist){
        return res
            .status(HTTPStatusCode.BAD_REQUEST)
            .json({message:ErrorMessages.CHAPTER_EXIST})
    }
    try {
        const createContent = await Content.create({
            chapterName:chapterName
        })
        return res
            .status(HTTPStatusCode.CREATED)
            .json({
                message:ErrorMessages.CREATED,
                content:createContent
            })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({ message:ErrorMessages.INTERNAL_SERVER,
                    error:error.message
                })
    }
})

//Get All Content
router.get('/getAllContent' , async(req,res) =>{
    try{
        const getAllContent = await Content.find()
        return res
            .status(HTTPStatusCode.OK)
            .json({
                message:ErrorMessages.GETDATA,
                content: getAllContent
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
router.get('/content/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const contentdetails = await Content.findOne({_id:id})
            if(contentdetails){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message: ErrorMessages.GETDATA,
                        content :contentdetails
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
router.patch('/content/update/:id', async(req,res) => {
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const contentUpdate = await Content.findByIdAndUpdate(id, req.body, {
                new:true
            })

            if(contentUpdate){
                return res
                .status(HTTPStatusCode.OK)
                .json({message: ErrorMessages.UPDATED,
                    content :contentUpdate
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
router.delete('/content/delete/:id', async(req,res) => {
    const id = req.params.id;
    try{
            if(ObjectId.isValid(id)){
                const contentDelete = await Content.findByIdAndDelete({_id:id})
                if(contentDelete){
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message:ErrorMessages.DELETED,
                            contetn: contentDelete
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