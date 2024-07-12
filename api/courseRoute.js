const express = require("express")
const mongoose = require("mongoose")
const app = express();
const path = require("path")
const multer = require("multer")
const router  = express.Router();
const {authenticateToken} = require("../authenticateToken")

const Storage = multer.diskStorage({
    destination: function (req, file, cb) { let dest = path.join(__dirname, '../uploads'); cb(null, dest);  },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
})
const upload = multer({
    storage:Storage
}).single('file')

const { createCourseController, 
        getAllCourseController, 
        getSingleCourseController,
        updateCourseController,
        deleteCourseController,
        getAllCourseForUserController,
        getSingleCourseForUserController
    } = require("../contollers/courseController")

//Create
router.post('/course/createCourse',upload,authenticateToken,createCourseController)
//Get All Data
router.get('/getAllCourse',authenticateToken, getAllCourseController)

//Get Single Course
router.get('/course/:id',authenticateToken, getSingleCourseController)

//Update Course
router.patch('/course/update/:id',authenticateToken, updateCourseController)

//Delete Course
router.delete('/course/delete/:id',authenticateToken,deleteCourseController)

//Get All Data for user
router.get('/getAllCourseforuser', getAllCourseForUserController)

//Get Single Data for user
router.get('/course/user/:id', getSingleCourseForUserController)

module.exports = router;