const mongoose = require("mongoose")
const express = require("express")
const ObjectId =  mongoose.Types.ObjectId;
const Chapter = require("../models/chapterModel")
const ContentVideo = require("../models/contnetVideoModel")
const Course = require("../models/courseModel")
const router = express.Router()
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
const {createChapterController,
    getAllChapterController, 
    getSingleChapterController, 
    updateChapterController, 
    deleteChapterController, 
    singleChapterForUser} = require("../contollers/chapterController")
//Create
router.post('/chapter/create' ,authenticateToken, createChapterController)

//Get All Chapter
router.get('/getAllChapter' , authenticateToken,getAllChapterController)

//Get Single Contnent
router.get('/chapter/:id',authenticateToken, getSingleChapterController)
//Update
router.patch('/chapter/update/:id',authenticateToken, updateChapterController)

//Delete
router.delete('/chapter/delete/:id', authenticateToken, deleteChapterController)

//Single Chapter for User
router.get('/chapter/user/:id', singleChapterForUser)
module.exports = router;