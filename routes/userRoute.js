const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { HTTPStatusCode, ErrorMessages}= require("../global.ts")
//User Create
router.post('/users/createuser', async (req,res)=>{
    const {firstname,lastname,gender,mobile,email,password,address,city,state,country,pincode,usertype,createdBy} =  req.body;
    try{
        const singleData = await User.findOne({email: email}) 
        if(singleData){
            return res.status(HTTPStatusCode.BAD_REQUEST).json({message: ErrorMessages.EMAIL_EXIST})
        }
        const singleDataPhone = await User.findOne({mobile: mobile}) 
        if(singleDataPhone){
            return res.status(HTTPStatusCode.BAD_REQUEST).json({message: ErrorMessages.MOBILE_NO_EXIST})
        }
        const userCreate = await User.create({
            firstName:firstname,
            lastName:lastname,
            gender:gender,
            mobile:mobile,
            email:email,
            password:password,
            address:address,
            city:city,
            state:state,
            country:country,
            pincode:pincode,
            usertype:usertype,
            createdBy:createdBy
        }) 
        return res.status(HTTPStatusCode.CREATED).json({ message: ErrorMessages.USER_REGISTER_SUCCESS, user:userCreate})

    } catch(error){
        console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
    }
})

//Get All data of User
router.get('/users', async (req,res) =>{
    try{
        const getAllData = await User.find();
        return res.status(HTTPStatusCode.OK).json({message: ErrorMessages.GETDATA,user: getAllData})
    }
    catch{
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER})
    }
})  

//Get Single Data
router.get('/users/:id', async(req,res) => {
    const id = req.params.id;

  try{
    if(ObjectId.isValid(id)){
        const getSingleData = await User.findOne({_id:id})
        if(getSingleData){
            return res.status(HTTPStatusCode.OK).json({message: ErrorMessages.GETDATA, user: getSingleData})
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.NOT_EXISTS})
        }
    }
    else{
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.WRONG_CREDENTIALS})
    }
  }catch{
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER})
  }
})
//Update
router.patch('/users/update/:id', async(req,res) => {
    const id = req.params.id;

  try{
    if(ObjectId.isValid(id)){
        const updateUser = await User.findByIdAndUpdate(id, req.body,
            {
                new:true
            }
        )
        if(updateUser){
            return res.status(HTTPStatusCode.OK).json({message: ErrorMessages.UPDATED, user: updateUser})
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.NOT_EXISTS})
        }
    }
    else{
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.WRONG_CREDENTIALS})
    }
  }catch{
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER})
  }
})
//Delete
router.delete('/users/delete/:id', async(req,res) => {
    const id = req.params.id;

  try{
    if(ObjectId.isValid(id)){
        const deleteUser = await User.findByIdAndDelete(id)
        if(deleteUser){
            return res.status(HTTPStatusCode.OK).json({message: ErrorMessages.DELETED, user: deleteUser})
        }
        else{
            return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.NOT_EXISTS})
        }
    }
    else{
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message: ErrorMessages.WRONG_CREDENTIALS})
    }
  }catch{
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER})
  }
})



module.exports = router;
