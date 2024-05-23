const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs");
const Login  = require("../models/loginModel")
const User = require("../models/userModel")
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const auth = require("../auth")
router.post('/user/login', async(req,res) =>{
    const{email,password} = req.body
    try {
        const userExist = await User.findOne({email:email})
        if(userExist){
            if(userExist.email){
                // userExist.password === password
                if((userExist && await bcrypt.compare(password, userExist.password))){
                    const accessToken = jwt.sign(
                        { user: userExist._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                          expiresIn: '10000m',
                        },
                      );
                      const refreshToken = jwt.sign(
                        { user: userExist._id },
                        process.env.REFRESH_TOKEN_SECRET,
                      );
                      const token = jwt.sign(
                        {id:userExist._id},
                        'shhhh', //process.env.jwtsecret
                        {
                            expiresIn: "2h"
                        }
                      );
                     


                    if(userExist){  
                        const userLogin = await Login.create({
                            email:email,
                            password:password,
                        })
                        userLogin.token = accessToken
                        userLogin.password = undefined
                        return res
                            .status(HTTPStatusCode.OK)
                            .json({
                                message:ErrorMessages.LOGIN_SUCCESS,
                                data:{
                                    user: userLogin,
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                }
                        })
                    }
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
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})
router.get('/user/allLoginData', async(req,res)=>{
    try {
        const allLoginData = await Login.find()
        return res
            .status(HTTPStatusCode.OK)
            .json({message:ErrorMessages.GETDATA,
                data:allLoginData
        })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
router.delete('/user/login/delete', async(req,res)=>{
    try {
        const allLoginData = await Login.deleteMany({email
            :"nishitpatel22@gmail.com"
            })
        return res
            .status(HTTPStatusCode.OK)
            .json({message:ErrorMessages.GETDATA,
                data:allLoginData
        })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
router.get('/admindb', auth, (req,res) => {
    console.log(req.user);
    res.send("Welcome to Dashboard")
})
module.exports = router