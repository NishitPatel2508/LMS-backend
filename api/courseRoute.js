const express = require("express")
const mongoose = require("mongoose")
const router  = express.Router();
const {authenticateToken} = require("../authenticateToken")
const { createCourseController, 
        getAllCourseController, 
        getSingleCourseController,
        updateCourseController,
        deleteCourseController,
        getAllCourseForUserController,
        getSingleCourseForUserController
    } = require("../contollers/courseController")

//Create
router.post('/course/createCourse',authenticateToken,createCourseController)
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