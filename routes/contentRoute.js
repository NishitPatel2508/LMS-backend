const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const Content = require("../models/contentModel")
const Course = require("../models/courseModel")
const Chapter = require('../models/chapterModel');
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Language = require("../models/languageModel")
const ContentVideo = require('../models/contnetVideoModel');
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")

// Create By using Id of Particular Course
router.post('/content/create', async(req,res) => {
    try {
        const {  
                course,
                chapter,
                contentvideo
            } = req.body
       
        
        //Course
        const courseData = []
        for (const singleId of course) {
            const courseID = await Course.findById({_id:singleId})
                if(courseID){
                    courseData.push(courseID)
                    const category = await Category.findById({_id:courseID.category})
                    if(category){
                        courseID.category = category
                    }
                    const subCategory = await Subcategory.findById({_id:courseID.subCategory})
                    if(subCategory){
                        courseID.subCategory = subCategory
                    }
                    const programmingLanguage = await ProgrammingLanguage.findById({_id: courseID.programmingLanguage})
                    if(programmingLanguage){
                        courseID.programmingLanguage = programmingLanguage
                    }
                    const language = await Language.findById({_id:courseID.language})
                    if(language){
                        courseID.language = language;
                    }
                }
        }
        console.log(course);
        //Chapter
        let chapterData =[]
        
        for (const singleId of chapter) {
            const chapterInfo = await Chapter.findById({_id:singleId})
                if(chapterInfo){
                    chapterData.push(chapterInfo)
                    // const category = await Category.findById({_id:courseID.category})
                    // if(category){
                    // //     courseID.category = category
                    // }
                }
        }
        //Content Video
        cvinfo = []
        for (const singleId of contentvideo) {
            const contentVideoInfo = await ContentVideo.findById({_id:singleId})
            cvinfo.push(contentVideoInfo)
        }
        // const contentVideoInfo = await ContentVideo.findById({_id:contentvideo})
        // contentVideoInfo.push(contentVideoDetails)
        // const contentVideoAllInfo = await ContentVideo.find();
        // const contentVideoInfo = []
        // for (const field of contentVideoAllInfo) {
        //     if(field.chapterDetailes == chapter){
        //             contentVideoInfo.push(field);
        //             console.log(contentVideoInfo);
        //     }
        // }
       
        //Chapter is Exist in Content MODEL
        // if(chapterDetailes._id == chapter){
        //     return res
        //     .status(HTTPStatusCode.BAD_REQUEST)
        //     .json({
        //          message: ErrorMessages.CONTENT_EXIST
        //     }) 
        // }
        //Content Video is Exist in Content MODEL
        // if(contentVideoID == contentVideo){
        //     return res
        //     .status(HTTPStatusCode.BAD_REQUEST)
        //     .json({
        //          message: ErrorMessages.CONTENT_VIDEO_EXIST
        //     }) 
        // }
        
        
            const createContent = await Content.create({
                courseDetailes:courseData,
                chapterDetailes:chapterData,
                contentVideoDetailes:cvinfo
            })
            return res
                .status(HTTPStatusCode.CREATED)
                .json({
                    message:ErrorMessages.CREATED,
                    data: createContent,
                 })
       
            // return res
            // .status(HTTPStatusCode.BAD_REQUEST)
            // .json({
            //      message: ErrorMessages.INVALID_CHAPTER
            // }) 
        
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message: ErrorMessages.INTERNAL_SERVER,
                error: error.message
        })
    }
})
router.get('/getAllContent', async(req,res) => {
    try {
        const getAllContent = await Content.find()
        if(getAllContent){
            for(const field of getAllContent) {
                const courseData = field.courseDetailes
                // const course = await Course.findById({_id:field.courseDetailes})
                console.log(courseData);
              
                let n1 = field.courseDetailes.length;
                let cnt1 = 0
                for (const singleId of field.courseDetailes) {
                    if (typeof singleId === 'object' &&  singleId !== null) {
                        // console.log(typeof singleId === 'object');
                        const courseInfo = await Course.findById({_id:singleId._id})
                        field.courseDetailes.push(courseInfo)
                        cnt1 = cnt1 + 1
                        if(cnt1 == n1){
                            field.courseDetailes.splice(0,cnt1)
                            break
                        } 
                    } 
                }
                // if(chapter){
                //     const course = await Course.findById({_id:chapter.course})
                //     if(course){
                //         chapter.course = course
                //     }
                //     field.chapterDetailes = chapter
                // }

                   
                let n2 = field.chapterDetailes.length;
                let cnt2 = 0
                for (const singleId of field.chapterDetailes) {
                    if (typeof singleId === 'object' &&  singleId !== null) {
                        // console.log(typeof singleId === 'object');
                        const chapterInfo = await Chapter.findById({_id:singleId._id})
                        field.chapterDetailes.push(chapterInfo)
                        cnt2 = cnt2 + 1
                        if(cnt2 == n2){
                            field.chapterDetailes.splice(0,cnt2)
                            break
                        } 
                    } 
                }
                
                let n = field.contentVideoDetailes.length;
                let cnt = 0
                for (const singleId of field.contentVideoDetailes) {
                    if (typeof singleId === 'object' &&  singleId !== null) {
                        // console.log(typeof singleId === 'object');
                        const contentVideoInfo = await ContentVideo.findById({_id:singleId._id})
                        field.contentVideoDetailes.push(contentVideoInfo)
                        cnt = cnt + 1
                        if(cnt == n){
                            field.contentVideoDetailes.splice(0,cnt)
                            break
                        } 
                    } 
                }
        
                   
                    
                // field.contentVideoDetailes.push(cvinfo)
                // console.log(cvinfo);
                
              
                
                // const contentVideoAllInfo = await ContentVideo.find();
                // console.log(contentVideoAllInfo.length);
                // const idOfNotIncludVideo = contentVideoAllInfo.reverse()
                //     for (const fieldOfContent  of idOfNotIncludVideo) { 
                //         field.contentVideoDetailes.push(fieldOfContent)
                //             if(contentVideoAllInfo.length === field.contentVideoDetailes.length){
                //                 break
                //             }
                //     }
                     
                    
                //     console.log(temp);
                //     for(const k of temp){
                //         for (const j of field.contentVideoDetailes) {
                //             if(field.contentVideoDetailes.includes(k) != true){
                //                 if(k.test(j)){
                //                     continue
                //                 } else {
                //                     field.contentVideoDetailes.push(k)
                //                 }
                                    
                                
                //             }
                           
                //         }
                //        
                // // if(field.contentVideoDetailes.includes(k) == false){           
                //     } 
                   
                
            }
        } 

        return res
            .status(HTTPStatusCode.OK)
            .json({
                message: ErrorMessages.GETDATA,
                data: getAllContent
            })
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Get Single Content
router.get('/content/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const getSingleContent = await Content.findById({_id:id})
            if(getSingleContent){
                let n1 = getSingleContent.courseDetailes.length;
                let cnt1 = 0
                console.log(getSingleContent.courseDetailes);
                for (const singleId of getSingleContent.courseDetailes) {
                    if (typeof singleId === 'object' &&  singleId !== null) {
                        // console.log(n1,singleId);
                        const courseInfo = await Course.findById({_id:singleId._id})
                        getSingleContent.courseDetailes.push(courseInfo)
                        console.log(getSingleContent.courseDetailes);
                        // if(courseInfo){
                        //     const category = await Category.findById({_id:singleId.category})
                        //     if(category){
                        //         courseInfo.category = category
                        //     }
                        //     const subCategory = await Subcategory.findById({_id:singleId.subCategory})
                        //     if(subCategory){
                        //         courseInfo.subCategory = subCategory
                        //     }
                        //     const programmingLanguage = await ProgrammingLanguage.findById({_id: singleId.programmingLanguage})
                        //     if(programmingLanguage){
                        //         courseInfo.programmingLanguage = programmingLanguage
                        //     }
                        //     const language = await Language.findById({_id:singleId.language})
                        //     if(language){
                        //         courseInfo.language = language;
                        //     }
                        // }
                        cnt1 = cnt1 + 1
                        if(cnt1 == n1){
                            getSingleContent.courseDetailes.splice(0,cnt1)
                            break
                        } 
                    } 
                }
               
                // if(course){
                //     getSingleContent.courseDetailes = course
                // }
                let n2 = getSingleContent.chapterDetailes.length;
                let cnt2 = 0
                // console.log(getSingleContent.chapterDetailes);
                for (const singleId of getSingleContent.chapterDetailes) {
                    if (typeof singleId === 'object' &&  singleId !== null) {
                        // console.log(n1,singleId);
                        const chapter = await Chapter.findById({_id:singleId._id})
                        getSingleContent.chapterDetailes.push(chapter)
                        
                        // if(courseInfo){
                        //     const category = await Category.findById({_id:courseInfo.category})
                        //     if(category){
                        //         courseInfo.category = category
                        //     }
                        //     const subCategory = await Subcategory.findById({_id:courseInfo.subCategory})
                        //     if(subCategory){
                        //         courseInfo.subCategory = subCategory
                        //     }
                        //     const programmingLanguage = await ProgrammingLanguage.findById({_id: courseInfo.programmingLanguage})
                        //     if(programmingLanguage){
                        //         courseInfo.programmingLanguage = programmingLanguage
                        //     }
                        //     const language = await Language.findById({_id:courseInfo.language})
                        //     if(language){
                        //         courseInfo.language = language;
                        //     }
                        // }
                        cnt2 = cnt2 + 1
                        if(cnt2 == n2){
                            getSingleContent.chapterDetailes.splice(0,cnt2)
                            break
                        } 
                    } 
                }
              
                // if(chapter){
                //     getSingleContent.chapterDetailes = chapter
                // }
                // const contentVideoInfo = await ContentVideo.findById({_id:getSingleContent.contentVideoDetailes})
                // if(contentVideoInfo){
                //     getSingleContent.contentVideoDetailes = contentVideoInfo
                // }
                let n = getSingleContent.contentVideoDetailes.length;
                let cnt = 0
                for (const singleId of getSingleContent.contentVideoDetailes) {
                    if (typeof singleId === 'object' &&  singleId !== null) {
                        
                        const contentVideoInfo = await ContentVideo.findById({_id:singleId._id})
                        getSingleContent.contentVideoDetailes.push(contentVideoInfo)
                        cnt = cnt + 1
                        if(cnt == n){
                            getSingleContent.contentVideoDetailes.splice(0,cnt)
                            break
                        } 
                    } 
                }
                // const contentVideoAllInfo = await ContentVideo.find();
                // const contentVideoInfo = []
                // for (const field of contentVideoAllInfo) {
                //     if(field.chapterDetailes == chapter){
                //         contentVideoInfo.push(field);
                //         getSingleContent.contentVideoDetailes = contentVideoInfo;
                //         console.log(contentVideoInfo);
                //     }
                // }
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.GETDATA,
                        data: getSingleContent
                    })
            }   
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                         message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
                
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Update Content
router.patch('/content/update/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const contentUpdate = await Content.findByIdAndUpdate(id, req.body, {
                new:true
            })
            if(contentUpdate){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.UPDATED,
                        data: contentUpdate
                    })
            }   
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                         message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
              
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
//Delete Content
router.delete('/content/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try {
        if(ObjectId.isValid(id)){
            const contentDelete = await Content.findByIdAndDelete({_id:id})
            if(contentDelete){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({
                        message: ErrorMessages.DELETED,
                        data: contentDelete
                    })
            }   
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({
                         message: ErrorMessages.NOT_EXISTS
                    }) 
            }
        } else {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message:ErrorMessages.WRONG_CREDENTIALS,
               
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
})
module.exports = router;