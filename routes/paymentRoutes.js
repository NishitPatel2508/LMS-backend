const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const Razorpay = require('razorpay');
const dotenv  = require("dotenv")
const crypto = require("crypto")
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
const Course = require("../models/courseModel")
const Content = require("../models/contentModel")
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Chapter = require("../models/chapterModel")
const ContentVideo = require("../models/contnetVideoModel")
const Language = require("../models/languageModel")
const MyCourses = require("../models/myCourseModel.js")
const User = require("../models/userModel");
const Order = require("../models/orderModel.js")
const Payment = require("../models/paymentModel.js");
const auth = require("../auth.js");
const Users = require("../models/userModel");
const Revenue = require("../models/revenueModel.js");
const { userInfo } = require("os");

dotenv.config()
// import {instance} from "../server.js"
router.post("/checkout",authenticateToken, async (req,res) =>{
    const userid = req.user.user;
        console.log("Nishit",userid);
        const userExist = await User.findOne({_id:userid})
        console.log("Nishit",userExist);
    try {
        var instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY})
        console.log("I",instance);
        let orderid = ""
        const {amount, receipt} = req.body;
        var options = {
          amount: amount,  // amount in the smallest currency unit
          receipt: receipt
        };
        await instance.orders.create(options, function(err, order) {
            // console.log(order);
            //   orderid = order.id
            const orderdetails = Order.create({
                order_id: order.id,
                amount:amount,
                userDetails:userExist
            })
            if(orderdetails){
                return res.status(HTTPStatusCode.OK).json({ message: ErrorMessages.USER_REGISTER_SUCCESS, data:order})
            }
            console.log("O",orderdetails);
        });
    
        
   
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({
            // message:error.message,
            data:("yyyy"+ error.message)
         })
    }
    // const options = {
    //     amount: 50000,  // amount in the smallest currency unit
    //     currency: "INR",
    //     receipt: "order_rcptid_11"
    //   };
    //   const order = instance.orders.create(options);
    //   console.log(order);
})

router.post('/verify', async(req,res) =>{
    try{    
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } =req.body;

        const sign =  razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(sign)
            .digest("hex")
        const isValid = expectedSign === razorpay_signature;
        if(isValid){
            // await 
            return res.status(HTTPStatusCode.OK)
                .json({message: ErrorMessages.PAYMENT_VARFIED_SUCCESS})
        } else {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message: ErrorMessages.PAYMENT_VARFIED_FAIL})
        }

    }catch(error){
        console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
    }
});

router.post('/mycourses',authenticateToken,async(req,res) =>{
    const {
        paymentId,
        course,
    } =req.body;
try {
    const userid = req.user.user;
    const userExist = await User.findOne({_id:userid})
    if(userExist){

        // const userCourse = localStorage.getItem("userbuycourse")
        const courseDetails = await Course.findById({_id:course})
        const mycourse = await MyCourses.create({
            paymentId:paymentId,
            course:courseDetails,
            user:userExist
        })
        if(mycourse){
            const price = courseDetails.price
            const instructorId = courseDetails.createdBy
            const buyDate = mycourse.createdAt
            const courseName = courseDetails.name
            userExist.token = undefined
            userExist.email = undefined
            userExist.password = undefined
            if(instructorId){
                const instructorExist = await Instructor.findById({_id:instructorId})
                if(price && instructorExist && buyDate){
                        const revenueDetails = await Revenue.create({
                                    // totalRevenue: r,
                                    courseAmount:price,
                                    courseInfo:courseName,
                                    userInfo:userExist,
                                    buyDate:buyDate,
                                    instructorInfo:instructorExist
                        })
                        if(revenueDetails){
                            return res.status(HTTPStatusCode.OK).json({
                                data:revenueDetails,
                                message:ErrorMessages.SAVED
                            }) 
                        } 
                }else {
                    return res.status(HTTPStatusCode.BAD_REQUEST).json({
                        message:ErrorMessages.NOT_FOUND
                    }) 
                }
            }
            return res.status(HTTPStatusCode.CREATED).json({ message: ErrorMessages.MYCOURSE_SUCCESS, data:mycourse})
        }
        else {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ message:ErrorMessages.MYCOURSE_FAIL })   
        }
    }
} catch (error) {
    console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:("Error",error.message)})
    }
});

router.get('/getallmycourses',authenticateToken,async(req,res) =>{
try {
    const userid = req.user.user;
    console.log(userid);
    const userExist = await User.findById({_id:userid})
    if(userExist){       
        const mycourse = await MyCourses.find({user:userid});
        console.log(mycourse);
        for (const fields of mycourse) {
            const info = fields.course;
            const singleCourse = await Course.findById({_id: info});
            if(singleCourse){
                fields.course = singleCourse
                const programmingLanguage = await ProgrammingLanguage.findById({_id:fields.course.programmingLanguage})
                if(programmingLanguage){
                    fields.course.programmingLanguage = programmingLanguage
                }
                const language = await Language.findById({_id:fields.course.language});
                if(language){
                    fields.course.language = language
                }
                const instructorExist = await Instructor.findById({_id:fields.course.createdBy})
                if(instructorExist){
                    fields.course.instructor = instructorExist
                }
            }
        }
        if(mycourse){
            

            // const category = await Category.findById({_id:info.category})
            // if(category){
            //     info.category = category;
            // }
            return res.status(HTTPStatusCode.OK).json({ message: ErrorMessages.MYCOURSE_SUCCESS, data:mycourse})
        }
        else {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ message:ErrorMessages.MYCOURSE_FAIL })   
        }
    }
} catch (error) {
    console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
    }
});


router.delete('/mycourses/delete/:id',async(req,res) =>{
    const id= req.params.id
try {
   
        const mycourse = await MyCourses.findByIdAndDelete({_id:id})
        if(mycourse){
            return res.status(HTTPStatusCode.OK).json({ message: ErrorMessages.DELETED, data:mycourse})
        }
        else {
            return res.status(HTTPStatusCode.BAD_REQUEST).json({ message:ErrorMessages.MYCOURSE_FAIL })   
        }
} catch (error) {
    console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INTERNAL_SERVER,error:error.message})
    }
});

//Revenue
// router.post('/revenue', authenticateToken, async(req,res) =>{
//     const instructorid = req.user.id;
//     console.log(instructorid);
//     let r = 0
//     let price = 0
//     let revenueDetails = []
//     let userDetails = []
//     let d = 0
//     try {        
//         const instructorExist = await Instructor.findById({_id:instructorid})
//         if(instructorExist){
//             if(instructorExist){
//                 instructorExist.profileImg = undefined
//             }

//             const boughtCourses =  await MyCourses.find();

//             for (const i of boughtCourses) {
//                 const singleCourse = await Course.findById({_id: i.course});
//                 if(singleCourse){
//                     singleCourse.courseImg = undefined
//                     i.course = singleCourse
//                     if(singleCourse.createdBy == instructorid){
//                         price = singleCourse.price
//                         r += singleCourse.price
//                         d = singleCourse.createdAt
//                         console.log(singleCourse.name, "  ", singleCourse.price)
//                         const userInfo = await Users.findById({_id:i.user})
//                         if(userInfo){
//                             userInfo.token = undefined
//                             userInfo.email = undefined
//                             userInfo.password = undefined
//                             i.user = userInfo
//                         }
//                         revenueDetails.push(singleCourse)
//                         userDetails.push(userInfo)
//                         // if()
//                         // console.log(boughtCourses);
//                         // const coursealreadyExist = await Revenue.find({courseInfo:i.course})
//                         // const useralreadyExist = await Revenue.find({userinfo:i.user})
//                         // console.log("Course",coursealreadyExist);
//                         // console.log("User",useralreadyExist);
//                         // if(!(coursealreadyExist && useralreadyExist )){
//                         //     const all = await Revenue.create({
//                         //         // totalRevenue: r,
//                         //         courseAmount:price,
//                         //         courseInfo:singleCourse,
//                         //         userInfo:userInfo,
//                         //         buyDate:d,
//                         //         instructorInfo:instructorExist
//                         //     })
//                         //     revenueDetails.push(all)
//                         // }
                       
//                     }
//                 }

//             }
//             // console.log(revenueDetails)
//             console.log(d)
//             console.log(revenueDetails.length)
//             console.log(revenueDetails[revenueDetails.length-1])
//             console.log(userDetails)
//             console.log(userDetails[userDetails.length-1])
//             // console.log(userDetails[userDetails.length])
//             console.log(boughtCourses.length)
//             return res.status(HTTPStatusCode.OK).json({
//                 data:revenueDetails,
//                 message:ErrorMessages.GETDATA
//             })
//         }
//     } catch (error) {
//         return res.status(HTTPStatusCode.INTERNAL_SERVER)
//                     .json({
//                         data:ErrorMessages.INTERNAL_SERVER,
//                         message: error.message
//                     })
//     }
// })

router.get('/getAllRevenue',authenticateToken,async(req,res) =>{
    const instructorid = req.user.id;
    console.log(instructorid);
   try {
    if(instructorid){
        const allDetails = await Revenue.find({instructorInfo:instructorid})
        if(allDetails){
            for (const i of allDetails) {
        
                    // const singleCourse = await Course.findById({_id: i.courseInfo});
                    // if(singleCourse){
                    //     singleCourse.courseImg = undefined
                    //     i.courseInfo = singleCourse
                    // }
                    const userInfo = await Users.findById({_id:i.userInfo})
                    if(userInfo){
                        userInfo.token = undefined
                        userInfo.email = undefined
                        userInfo.password = undefined
                        i.userInfo = userInfo
                    }

            }
            return res.status(HTTPStatusCode.OK)
            .json({
                data:allDetails,
                message: ErrorMessages.GETDATA,
            })
        }
    }
   } catch (error) {
    return res.status(HTTPStatusCode.INTERNAL_SERVER)
    .json({
        data:ErrorMessages.INTERNAL_SERVER,
        message: error.message
    })
   }
})


module.exports = router;