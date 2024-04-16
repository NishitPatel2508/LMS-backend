const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const Login  = require("../models/loginModel")
const ForgotPassword = require("../models/forgotPasswordModel")
const User = require("../models/userModel")
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
var nodemailer = require('nodemailer');
const Mailgen = require("mailgen");
const {EMAIL,PASSWORD} = require("../routes/env")
router.post('/user/forgotpassword/', async(req,res)=>{
    const {email,password} = req.body;
    try {
        const userExist = await Login.findOne({email:email})
        if(userExist){
            // console.log(userExist._id);
            if(userExist.email){

                let pass = ''
                const otpGenerate = () =>{
                    for (let i = 1; i <= 6; i++) {
                        let char = Math.floor(Math.random() *10 )
                        pass += char
                    }
                    console.log(pass);
                    return pass
                }
                let otps = otpGenerate()
                const forgotPasswordUser = await ForgotPassword.create({
                    email:email,
                    otp:otps
                })
                const updatePasswordOfUser = await User.findOne({email:forgotPasswordUser.email})
                console.log(updatePasswordOfUser._id);
                const fpuserid = updatePasswordOfUser._id
                const setNewPasswordOfUser = await User.findById({_id:fpuserid})
                if(setNewPasswordOfUser){
                    const userWithUpdatedPassword = await updatePasswordOfUser.updateOne({password:password})
                    console.log(updatePasswordOfUser);
                }
                let config = {
                    service: 'gmail',
                    auth: {
                        user: EMAIL,
                        pass: PASSWORD,
                    }
                }

                const transporter = nodemailer.createTransport(config);
                    let MailGenerator = new Mailgen({
                        theme: "default",
                        product: {
                            name:"Mailgen",
                            link:"https://mailgen.js"
                        }
                })

                let response = {
                        body:{
                            name:"Nishit Patel",
                            intro:"OTP for Forget Password",
                            table:{
                                data:[
                                    {
                                        OTP:otps,
                                        
                                    }
                                ]
                            },
                            outro:"Set New Password"
                        }
                }
                let mail  = MailGenerator.generate(response)
                let message = {
                      from: EMAIL,
                      to: email,
                      subject: 'OTP successfully sent',
                      text: `OTP successfully sent `,
                      html:mail
                };
                transporter.sendMail(message).then(()=>{
                        return res
                        .status(HTTPStatusCode.OK)
                        .json({
                                message:ErrorMessages.OTP_SENT,
                                data:forgotPasswordUser                                // data1:
                        })   
                })
                .catch(()=>{
                        return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({
                                message:ErrorMessages.NOT_FOUND
                        })    
                })
               
                // console.log(setNewPasswordOfUser);
                // updatePassword()

            } else {
                return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                        message:ErrorMessages.INVALID_EMAIL
                })   
            }

        } else {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                        message:ErrorMessages.EMAIL_DOES_NOT_EXIST 
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
router.get('/user/forgotpassword/alldata', async(req,res) => {
    try {
        const Alldata = await ForgotPassword.find()
        return res
        .status(HTTPStatusCode.OK)
        .json({
                message:ErrorMessages.GETDATA,
                data:Alldata
        }) 
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ 
            message:ErrorMessages.INTERNAL_SERVER,
            error:error.message
        })
    }
})
router.delete('/user/forgotpassword/delete', async(req,res) =>{
    const id = req.params.id
    try {
        if(ObjectId.isValid(id)){
            const forgotpasswordUserDelete = await ForgotPassword.deleteMany({email:email});
            if(forgotpasswordUserDelete){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.DELETED,
                        data: forgotpasswordUserDelete
                    })
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                    .status(HTTPStatusCode.INTERNAL_SERVER)
                    .json({
                        message:ErrorMessages.WRONG_CREDENTIALS,
                        
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
module.exports = router;