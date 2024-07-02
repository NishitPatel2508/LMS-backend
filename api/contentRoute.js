const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const {authenticateToken} = require("../authenticateToken")

const { createContentController, getAllContentController, getSingleContentController,
    updateContentController,
    deleteContentController,
    getSingleForUserContentController } = require("../contollers/contentController")

// Create By using Id of Particular Course
router.post('/content/create',authenticateToken, createContentController)
router.get('/getAllContent',authenticateToken, getAllContentController)
//Get Single Content
router.get('/content/:id',authenticateToken, getSingleContentController)
//Update Content
router.patch('/content/update/:id',authenticateToken, updateContentController)
//Delete Content
router.delete('/content/delete/:id',authenticateToken, deleteContentController)
router.get('/content/user/:id', getSingleForUserContentController)
module.exports = router;