const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const Language = require("../models/languageModel")
const Instructor = require("../models/instructorModel");
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const  {createLanguageController,getAllLanguagesController,getSingleLanguagesController,updateLanguageController,deleteLanguageController} = require("../contollers/languageController")
//Create
router.post("/Language/create",authenticateToken,createLanguageController)

//Get All data
router.get('/getAllLanguages',authenticateToken, getAllLanguagesController)

//Get Single Data
router.get('/language/:id',authenticateToken,getSingleLanguagesController)

//Update
router.patch('/language/update/:id',authenticateToken, updateLanguageController)

//Delete
router.delete('/language/delete/:id',authenticateToken, deleteLanguageController)
module.exports = router;