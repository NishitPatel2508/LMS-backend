const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const ObjectId = mongoose.Types.ObjectId;

const {authenticateToken} = require("../authenticateToken")
const {  createContentVideoController,
    getAllContentVideoController,
    getSingleContentVideoController,
    updateContentVideoController,
    deleteContentVideoController}  = require("../contollers/contentVideoController")
//Create
router.post('/contentvideo/create',authenticateToken,createContentVideoController)

//Get All Data
router.get('/getAllContentVideo' ,authenticateToken, getAllContentVideoController)

// Get Single Data
router.get('/contentvideo/:id' ,authenticateToken,getSingleContentVideoController)

//Update
router.patch('/contentvideo/update/:id',authenticateToken,updateContentVideoController)

//Delete
router.delete('/contentvideo/delete/:id',authenticateToken, deleteContentVideoController)
module.exports = router;