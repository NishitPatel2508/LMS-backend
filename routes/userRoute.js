const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { HTTPStatusCode, ErrorMessages}= require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
//User Create
router.post('/users/createuser', async (req,res)=>{
    const {name,email,password,createdBy} =  req.body;
    try{
        // Check User already exist or not
        const singleData = await User.findOne({email: email}) 
        if(singleData){ 
            return res.status(HTTPStatusCode.BAD_REQUEST).json({message: ErrorMessages.EMAIL_EXIST})
        }

        // Encrypt Password
        const myEncryptedPassword = await bcrypt.hash(password,10);
        const userCreate = await User.create({
           name:name,
            email:email,
            password:myEncryptedPassword,
           
        }) 

        // Generate Token
        const token = jwt.sign(
          {id:userCreate._id, email},
          'shhhh',
          {
            expiresIn:"2h"
          }
        )
        userCreate.token = token;
        userCreate.password = undefined;
        return res.status(HTTPStatusCode.CREATED).json({ message: ErrorMessages.USER_REGISTER_SUCCESS, data:userCreate})

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
router.patch('/users/update/:id',authenticateToken ,async(req,res) => {
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

let refreshTokens = [];
router.post('/generateToken', async (req, res) => {
  const { id } = req.body;
  try {
    const doesUserExit = await User.findOne({ _id: id }).select('_id').lean();
    if (doesUserExit) {
      const user = { id: id };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message: ErrorMessages.NOT_EXIST });
    }
  } catch (error) {
    res
      .status(HTTPStatusCode.INTERNAL_SERVER)
      .json({ message: ErrorMessages.INTERNAL_SERVER });
  }
});
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}

module.exports = router;
