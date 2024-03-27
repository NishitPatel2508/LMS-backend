const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Content = require("../models/contentModel")
const Chapter = require('../models/chapterModel');
const ContentVideo = require('../models/contnetVideoModel');
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")

// Create
router.post('/content/create', async(req,res) => {
    try {
        let {chapterId,contentVideoId} = req.body
        // let chapterId,
        // let chapterId = ""
        // let contentVideoId = []

        const chapter = await Chapter.find();
        const video = await ContentVideo.find();
        if(chapter && video){
            let arrOfChapter = []
            chapter.forEach(ele => {
                arrOfChapter.push(ele._id);
            });
            chapterId = arrOfChapter;
            let arrOfVideo = []
            video.forEach(ele => {
                arrOfVideo.push(ele._id);
            });
            contentVideoId = arrOfVideo;
        }
        else{
            return res
                .status(HTTPStatusCode. BAD_REQUEST)
                .json({
                    message: ErrorMessages. WRONG_CREDENTIALS
            })  
        }
        const createContent = await Content.create({
                chapterId:chapterId,
                contentVideoId:contentVideoId
        })
        return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message:ErrorMessages.CREATED,
                    data: createContent,
                })
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message: ErrorMessages.INTERNAL_SERVER,
                error: error.message
        })
    }
})

module.exports = router;