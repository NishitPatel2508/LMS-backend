const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const State = require("../models/stateModel")
const Country = require("../models/countryModel");
const {HTTPStatusCode,ErrorMessages} = require("../global.ts");
const ObjectId = mongoose.Types.ObjectId;

//Create
router.post('/state/create', async(req,res) =>{
    const {stateName} = req.body;
   try{
       
        const country = await Country.findOne({countryName: 'India'})
        const countryID=country._id
        const stateExistCheck = await State.findOne({stateName:stateName})
        if(stateExistCheck){
            return res.status(HTTPStatusCode.BAD_REQUEST).json({message:ErrorMessages.STATE_EXIST})
        }
        const createState = await State.create({
            countryId:countryID,
            stateName:stateName
        })
        return res.status(HTTPStatusCode.CREATED).json({message: ErrorMessages.CREATED, state:createState})
   }catch(error){
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
   }
})

//Get All Data
router.get('/getAllState' , async(req,res) =>{
    try{
        const getAllState = await State.find();
        return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.GETDATA, state:getAllState})
    }catch(error){
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER, error:error.message})
    }
})

//Get Single Data
router.get('/state/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const getSingleState = await State.findOne({_id:id})
            if(getSingleState){
                return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.GETDATA, state:getSingleState})
            }
            else{
                return res.status(HTTPStatusCode.BAD_REQUEST).json({message:ErrorMessages.WRONG_CREDENTIALS})
            }
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.NOT_FOUND})
        }
    }catch(error){
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER, error:error.message})
    }
})

//Update
router.patch('/state/update/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const singleState = await State.findOne({_id:id})
        if(ObjectId.isValid(id)){
            if(singleState){
                const updateState = await State.findByIdAndUpdate(id, req.body, {
                    new:true
                })
                return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.UPDATED, state:updateState})
            }
            else{
                return res.status(HTTPStatusCode.BAD_REQUEST).json({message:ErrorMessages.WRONG_CREDENTIALS})
            }
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.NOT_FOUND})
        }
    }
   
    catch(error){
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER, error:error.message})
    }
})

//Delete
router.delete('/state/delete/:id', async(req,res) => {
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const deleteState = await State.findByIdAndDelete(id);
            if(deleteState){
                return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.DELETED, state:deleteState})
            }
            else{
                return res.status(HTTPStatusCode.BAD_REQUEST).json({message:ErrorMessages.NOT_EXISTS})
            }
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.WRONG_CREDENTIALS})
        }
    }
    catch{
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

module.exports = router;