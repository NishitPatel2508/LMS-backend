const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const path = require("path")
const Instructor = require("../models/instructorModel")
const InstructorLogin = require("../models/instructorLogin")
const Course = require("../models/courseModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const app = express();
// Storage
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const Storage = multer.diskStorage({
    destination: function (req, file, cb) { let dest = path.join(__dirname, '../uploads'); cb(null, dest);  },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
})
const upload = multer({
    storage:Storage
}).single('file')
//Create
router.post('/instructor/create', async(req,res) => {
    try {
        const { 
                // courseId,
                name,
                email,
                password,
                gender,
                mobile,
                experience,
                about,
                linkedin,
                instagram,
                twitter,
                discord,
                nameOfImg,
            } = req.body;
        // const courseInfo = await Course.findById({_id:courseId})
        // courseDetails:courseInfo
        // const insdtructorImg = req.file.originalname
        // console.log("img",insdtructorImg);
        // console.log("imgName",req.file.originalname);
        const instructorCreate = await Instructor.create({
            name:name,
            email:email,
            password:password,
            mobile:mobile,
            gender:gender,
            experience:experience,
            about:about,
            linkedin:linkedin,
            instagram:instagram,
            twitter:twitter,
            discord:discord,
          
        })
        return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message: ErrorMessages.CREATED,
                    data: instructorCreate
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

//Get All
router.get('/getAllInstructor', authenticateToken,async(req,res)=>{
    try {
        const getAllInstructor = await Instructor.find()
        // if(getAllInstructor){
        //     for (const field of getAllInstructor) {
        //         const courseInfo = await Course.findById({_id:field.courseDetails})
        //         field.courseDetails= courseInfo
        //     }
        // 
            return res  
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.GETDATA,
                    data:getAllInstructor
            })
        // }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})

//Get single Instructor
router.get('/instructor/get', authenticateToken,async(req,res) => {
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(instructorExist){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: instructorExist
                    })
            }
        } else{
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({
                    message:ErrorMessages.NOT_EXISTS,
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
//Update 
router.patch('/instructor/update/:id',authenticateToken, upload,async(req,res) => {
    const id = req.params.id;
    
    try {
        if(ObjectId.isValid(id)){
            const instructorUpdate = await Instructor.findByIdAndUpdate(id,req.body,{profileImg:req.file.originalname}, {
                new:true
            })
          
            if(instructorUpdate){
                // const courseInfo = await Course.findById({_id:instructorUpdate.courseDetails})
                // instructorUpdate.courseDetails = courseInfo;
                return res  
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.UPDATED,
                    data:instructorUpdate
                })
            }   else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_EXISTS,
                    })
            }

        } else    {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
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
//Delete
router.delete('/instructor/delete/:id',authenticateToken, async(req,res) => {
    const id= req.params.id
    try {
        if(ObjectId.isValid(id)){
            const instructorDelete = await Instructor.findByIdAndDelete({_id:id})
            if(instructorDelete){
                return res  
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.DELETED,
                    data:instructorDelete
                })
            }   else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                        message:ErrorMessages.NOT_EXISTS,
                    })
            }

        } else    {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
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

//instructor Login
router.post('/instructor/login', async(req,res) =>{
    const{email,password} = req.body
    try {
        const instructorExist = await Instructor.findOne({email:email})
        if(instructorExist){
            if(instructorExist.email){
                if(instructorExist.password === password){
                    const accessToken = jwt.sign(
                        { id: instructorExist._id },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                          expiresIn: '10000m',
                        },
                      );
                      const refreshToken = jwt.sign(
                        { id: instructorExist._id },
                        process.env.REFRESH_TOKEN_SECRET,
                      );
                    const instructorLogin = await InstructorLogin.create({
                        email:email,
                        password:password
                    })
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({
                            message:ErrorMessages.LOGIN_SUCCESS,
                            data:{
                                Instructor: instructorLogin,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }
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
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})


// Revanue
module.exports = router;