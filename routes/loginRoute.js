const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Login  = require("../models/loginModel")
const User = require("../models/userModel")
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
router.post('/user/login', async(req,res) =>{
    const{email,password} = req.body
    
    try {
        const userExist = await User.findOne({email:email})
        if(userExist){
            console.log(userExist._id);
            console.log(userExist.password); 
            if(userExist.email){
                if(userExist.password === password){
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message:ErrorMessages.LOGIN_SUCCESS,
                            data:userExist
                    })
                } else {
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                            message:ErrorMessages.PASSWORD_DOES_NOT_MATCH,
                            data:ErrorMessages.PASSWORD_DOES_NOT_MATCH
                    })
                }
            } else {
                return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                        message:ErrorMessages.EMAIL_DOES_NOT_EXIST
                })   
            }

        } else {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                        message:ErrorMessages.EMAIL_DOES_NOT_EXIST,
                        
                })
        }

      
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
module.exports = router