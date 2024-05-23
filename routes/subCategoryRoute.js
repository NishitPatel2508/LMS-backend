const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const Subcategory = require("../models/subcategoryModel")
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const Category = require("../models/categoryModel")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
const {createSubCategoryController,
    getAllSubCategoryController,
    getSingleSubCategoryController, 
    updateSubCategoryController,
    deleteSubCategoryController} = require("../contollers/subCategoryController")
//Create
router.post("/subCategory/create", authenticateToken,createSubCategoryController)

//Get All data
router.get('/getAllSubCategory', authenticateToken,getAllSubCategoryController)

//Get Single Data
router.get('/subCategory/:id' , authenticateToken,getSingleSubCategoryController)

//Update
router.patch('/subCategory/update/:id',authenticateToken,updateSubCategoryController )

//Delete
router.delete('/subCategory/delete/:id',authenticateToken,deleteSubCategoryController)

module.exports = router;