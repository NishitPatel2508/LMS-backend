const mongoose = require("mongoose")
const express =require("express")
const router = express.Router()
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/userModel")
const ForgotPassword = require("../models/forgotPasswordModel")
const {HTTPStatusCode,ErrorMessages} = require("../global.ts");
const {authenticateToken} = require("../authenticateToken")
const jwt = require("jsonwebtoken")
const Login = require("../models/loginModel");
router.post("/newpassword/:id/:token",authenticateToken,async(req,res)=>{


    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            // const validuser = await User.findOne({_id:id,verifytoken:token});
            // const {token} = req.params;
            
            const {password,token} = req.body;
            // const verifyToken = jwt.verify(token,keysecret);
            
            
            // const newPassword = req.body.password
            const validuser = await User.findById(id)
            console.log(validuser);
            if(validuser){
                console.log(validuser);
                const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:password});
                setnewuserpass.save();
                res.status(201).json({"message": setnewuserpass})
            }else{
                res.status(401).json({status:401,message:"user not exist"})
            }
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

module.exports = router;