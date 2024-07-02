// import * as path from 'path';
const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const router = express.Router();
const {authenticateToken} = require("../authenticateToken");
const multer = require("multer")
const {uploadFileController,getAllContentFileController,getSingleContentFileController,deleteContentFileController,updateContentFileController} = require("../contollers/contentFileController")
// const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads');
// Storage
const Storage = multer.diskStorage({
    destination: function (req, file, cb) { let dest = path.join(__dirname, '../uploads'); cb(null, dest);  },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
})
const upload = multer({
    storage:Storage
}).single('file')
// app.use('/uploads',express.static("/uploads"));

router.post('/file/upload',authenticateToken,upload,uploadFileController) 
router.get('/allFiles',authenticateToken,getAllContentFileController) 
router.get('/singleFile/:id',authenticateToken,getSingleContentFileController) 
router.patch('/file/update/:id',authenticateToken,upload,updateContentFileController) 
router.delete('/file/delete/:id',authenticateToken,deleteContentFileController) 

module.exports = router;