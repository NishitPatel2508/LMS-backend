const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Country = require("../models/countryModel");
const ObjectId = require("mongoose").Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")

router.post('/country/create', async(req,res) => {
    const {countryName} = req.body;
    try{
        //If Country already exist or not.
        const countryExistCheck = await Country.findOne({countryName:countryName})
        if(countryExistCheck ){
            return res.status(HTTPStatusCode.BAD_REQUEST).json({message: ErrorMessages.COUNTRY_EXIST})
        }
        const countryCreate  = await Country.create({
            countryName:countryName
        })
        return res.status(HTTPStatusCode.CREATED).json({message:ErrorMessages.ADDED, country: countryCreate})
    }
    catch(error){
        console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
    }
})

//Get All Data
router.get('/allCountry', async(req,res) =>{
    
    try{
        const getAllData = await Country.find();
        return res.status(HTTPStatusCode.OK).json({message: ErrorMessages.GETDATA, country:getAllData})
    }
    catch{
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER, error:error.message})
    }
})

//Get Single Data
router.get('/country/:id', async(req,res) =>{
    const enteredid = req.params.id;
    try{
        if(ObjectId.isValid(enteredid)){
            const getSingleCountry = await Country.findOne({_id:enteredid})
            if(getSingleCountry){
                return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.GETDATA, country:getSingleCountry})
            }
            else{
                return res.status(HTTPStatusCode.BAD_REQUEST).json({message:ErrorMessages.NOT_EXISTS,error:error.message})
            }
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.WRONG_CREDENTIALS})
        }
     
    }
    catch(error){
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER})
    }   
})

//Update
router.patch('/country/update/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const updateCountry = await Country.findByIdAndUpdate( id, req.body ,
                {
                    new:true
                }
            )
            if(updateCountry){
                return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.UPDATED, country: updateCountry})
            }
            else{
                return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.NOT_EXISTS})
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

//delete
router.delete('/country/delete/:id' ,async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const  deleteCountry = await Country.findByIdAndDelete(id) 
            if(deleteCountry){
                return res.status(HTTPStatusCode.OK).json({message:ErrorMessages.DELETED, country:deleteCountry})
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