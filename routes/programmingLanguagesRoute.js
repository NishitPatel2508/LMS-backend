const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Subcategory = require("../models/subcategoryModel")

// const InstructorLogin = require("../models/instructorLogin")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
const {createProgrammingLanguageController,
    getAllProgrammingLanguageController,
    getSingleProgrammingLanguageController,
    updateProgrammingLanguageController,deleteProgrammingLanguageController} = require("../contollers/programmingLanguagesController")
//Create
router.post("/programmingLanguage/create",authenticateToken, createProgrammingLanguageController)

//Get All data
router.get('/getAllProgrammingLanguage', authenticateToken,getAllProgrammingLanguageController)

//Get Single Data
router.get('/programmingLanguage/:id' ,authenticateToken, getSingleProgrammingLanguageController)

//Update
router.patch('/programmingLanguage/update/:id',authenticateToken, updateProgrammingLanguageController)

//Delete
router.delete('/programmingLanguage/delete/:id',authenticateToken, deleteProgrammingLanguageController)
module.exports = router;