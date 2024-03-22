const express = require("express")
const mongoose = require("mongoose")
const City= require("../models/cityModel")
const State = require("../models/stateModel")
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")

//Create
router.post('/city/create', async(req,res) => {
    const {cityName} = req.body;
    try{
        const state = await State.findOne({stateName:'Tamil Nadu'})
        const stateID= state._id;
        const cityExistCheck = await City.findOne({cityName:cityName})
        if(cityExistCheck){
            return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.CITY_EXIST})
        }
        const createCity = await City.insertMany({
            stateId:stateID,
            cityName:cityName
        })
        return res
                .status(HTTPStatusCode.CREATED)
                .json({message:ErrorMessages.CREATED, city:createCity})
    }catch(error){
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
    }
})

//GET ALL DATA
router.get('/getAllCity', async(req,res) =>{
    try{
        const getAllCity = await City.find();
        return res
            .status(HTTPStatusCode.OK)
            .json({message:ErrorMessages.GETDATA,
                    city:getAllCity
            })  
    }
    catch(error){
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({message:ErrorMessages.INTERNAL_SERVER,
                    error:error.message
                })
    }
})

//Get Single Data
router.get('/city/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const getSingleCity = await City.findOne({_id:id})

            if(getSingleCity){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.GETDATA,
                            city:getSingleCity
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
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({message:ErrorMessages.WRONG_CREDENTIALS})
        }
    }
    catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Update
router.patch('/city/update/:id', async(req,res) => {
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const updateCity = await City.findByIdAndUpdate(id, req.body,
                {
                    new:true 
                }
            )
            if(updateCity){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.UPDATED,
                        city:updateCity    
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
    }catch(error){
        return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({message:ErrorMessages.INTERNAL_SERVER})
    }

})

//Delete 
router.delete('/city/delete/:id', async(req,res) =>{
    const id = req.params.id
    try{
        if(ObjectId.isValid(id)){
            const deleteCity = await City.findByIdAndDelete(id)
            if(deleteCity){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.DELETED,
                        city:deleteCity
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
    catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
module.exports = router;