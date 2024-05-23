const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const {authenticateToken} = require("../authenticateToken");
const  {createReviewController,
    getAllReviewController,
    getSingleReviewController,
    updateReviewController, 
    deleteReviewController,
    getAllReviewForCoursePageController } = require("../contollers/reviewController")
//Create
router.post('/review/create',authenticateToken, createReviewController)

//Get All Review
router.get('/getAllReview',authenticateToken,getAllReviewController)

//Get Single Data
router.get('/review/:id', authenticateToken,getSingleReviewController)
//Update
router.patch('/review/update/:id', authenticateToken,updateReviewController)
//Delete
router.delete('/review/delete/:id',authenticateToken, deleteReviewController)
//Get Single Data
router.get('/review/getAll/:id',authenticateToken,getAllReviewForCoursePageController)
module.exports = router;