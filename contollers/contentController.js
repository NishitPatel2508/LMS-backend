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
const ContentFile = require("../models/contentFileModel")
const ObjectId = mongoose.Types.ObjectId
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
// Create By using Id of Particular Course
const createContentController = async(req,res) => {
        try{
            const {  
                course,
                chapter,
                contentvideo,
                contentfile
            } = req.body
        //Course
        const userid = req.user.id;
        console.log(userid);
            const instructorExist = await Instructor.findById({_id:userid})
            if(instructorExist){
                    const courseID = await Course.findById({_id:course})
                        if(courseID){
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
                
                console.log(course);
                //Chapter

               
                    const chapterInfo = await Chapter.findById({_id:chapter})

                //Content Video
               
                    const contentVideoInfo = await ContentVideo.findById({_id:contentvideo})
                
                    //Content File

                    const contentFileInfo = await ContentFile.findById({_id:contentfile})
                
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
                        courseDetailes:courseID,
                        chapterDetailes:chapterInfo,
                        contentVideoDetailes:contentVideoInfo,
                        contentFileDetailes:contentFileInfo,
                        createdBy:instructorExist
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
            }         
        } catch (error) {
            return res
                .status(HTTPStatusCode.INTERNAL_SERVER)
                .json({
                    message: ErrorMessages.INTERNAL_SERVER,
                    error: error.message
            })  
        }
}
const getAllContentController = async(req,res) => {
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllContent = await Content.find({createdBy:userid})
            if(getAllContent){
                for(const field of getAllContent) {
                    const course = await Course.findById({_id:field.courseDetailes})
                    if(course){
                        field.courseDetailes = course
                    }
                    const chapter = await Chapter.findById({_id:field.chapterDetailes})
                    if(course){
                        field.chapterDetailes = chapter;
                    }
                    const contentVideo = await ContentVideo.findById({_id:field.contentVideoDetailes})
                    if(course){
                        field.contentVideoDetailes = contentVideo;
                    }
                    const contentFile = await ContentFile.findById({_id:field.contentFileDetailes})
                    if(course){
                        field.contentFileDetailes = contentFile;
                    }
                }
                //     const courseData = field.courseDetailes
                //     // const course = await Course.findById({_id:field.courseDetailes})
                //     console.log(courseData);
                
                    // let n1 = field.courseDetailes.length;
                    // let cnt1 = 0
                    // for (const singleId of field.courseDetailes) {
                    //     if (typeof singleId === 'object' &&  singleId !== null) {
                    //         // console.log(typeof singleId === 'object');
                            // const courseInfo = await Course.findById({_id:singleId._id})
                            // field.courseDetailes.push(courseInfo)
                            // cnt1 = cnt1 + 1
                            // if(cnt1 == n1){
                            //     field.courseDetailes.splice(0,cnt1)
                            //     break
                            // } 
                    //     } 
                    // }
                    // if(chapter){
                    //     const course = await Course.findById({_id:chapter.course})
                    //     if(course){
                    //         chapter.course = course
                    //     }
                    //     field.chapterDetailes = chapter
                    // }
                    // let n2 = field.chapterDetailes.length;
                    // let cnt2 = 0
                    // for (const singleId of field.chapterDetailes) {
                    //     if (typeof singleId === 'object' &&  singleId !== null) {
                    //         // console.log(typeof singleId === 'object');
                    //         const chapterInfo = await Chapter.findById({_id:singleId._id})
                    //         field.chapterDetailes.push(chapterInfo)
                    //         cnt2 = cnt2 + 1
                    //         if(cnt2 == n2){
                    //             field.chapterDetailes.splice(0,cnt2)
                    //             break
                    //         } 
                    //     } 
                    // }
                    // let n = field.contentVideoDetailes.length;
                    // let cnt = 0
                    // for (const singleId of field.contentVideoDetailes) {
                    //     if (typeof singleId === 'object' &&  singleId !== null) {
                    //         // console.log(typeof singleId === 'object');
                    //         const contentVideoInfo = await ContentVideo.findById({_id:singleId._id})
                    //         field.contentVideoDetailes.push(contentVideoInfo)
                    //         cnt = cnt + 1
                    //         if(cnt == n){
                    //             field.contentVideoDetailes.splice(0,cnt)
                    //             break
                    //         } 
                    //     } 
                    // }
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
            

            return res
                .status(HTTPStatusCode.OK)
                .json({
                    message: ErrorMessages.GETDATA,
                    data: getAllContent
                })
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
}
//Get Single Content

const getSingleContentController =  async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const getSingleContent = await Content.findById({_id:id})
                if(getSingleContent){
                    // let n1 = .length;
                    const courseInfo = await Course.findById({_id:getSingleContent.courseDetailes})
                    getSingleContent.courseDetailes = courseInfo
                    console.log(getSingleContent.courseDetailes);
                    // for (const singleId of getSingleContent.courseDetailes) {
                    //     if (typeof singleId === 'object' &&  singleId !== null) {
                    //         // console.log(n1,singleId);
                    //         const courseInfo = await Course.findById({_id:singleId._id})
                    //         getSingleContent.courseDetailes.push(courseInfo)
                    //         console.log(getSingleContent.courseDetailes);
                    //         cnt1 = cnt1 + 1
                    //         if(cnt1 == n1){
                    //             getSingleContent.courseDetailes.splice(0,cnt1)
                    //             break
                    //         } 
                    //     } 
                    // }
                    const chapterInfo = await Chapter.findById({_id:getSingleContent.chapterDetailes})
                    getSingleContent.chapterDetailes = chapterInfo
                    console.log(getSingleContent.chapterDetailes);

                    // let n2 = getSingleContent.chapterDetailes.length;
                    // let cnt2 = 0
                    // // console.log(getSingleContent.chapterDetailes);
                    // for (const singleId of getSingleContent.chapterDetailes) {
                    //     if (typeof singleId === 'object' &&  singleId !== null) {
                    //         // console.log(n1,singleId);
                    //         const chapter = await Chapter.findById({_id:singleId._id})
                    //         getSingleContent.chapterDetailes.push(chapter)

                    //         cnt2 = cnt2 + 1
                    //         if(cnt2 == n2){
                    //             getSingleContent.chapterDetailes.splice(0,cnt2)
                    //             break
                    //         } 
                    //     } 
                    // }
                    const contentVideoInfo = await ContentVideo.findById({_id:getSingleContent.contentVideoDetailes})
                    getSingleContent.contentVideoDetailes = contentVideoInfo
                    const contentFileInfo = await ContentFile.findById({_id:getSingleContent.contentFileDetailes})
                    getSingleContent.contentFileDetailes = contentFileInfo
                    // let n = getSingleContent.contentVideoDetailes.length;
                    // let cnt = 0
                    // for (const singleId of getSingleContent.contentVideoDetailes) {
                    //     if (typeof singleId === 'object' &&  singleId !== null) {

                    //         const contentVideoInfo = await ContentVideo.findById({_id:singleId._id})
                    //         getSingleContent.contentVideoDetailes.push(contentVideoInfo)
                    //         cnt = cnt + 1
                    //         if(cnt == n){
                    //             getSingleContent.contentVideoDetailes.splice(0,cnt)
                    //             break
                    //         } 
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
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
}
//Update Content

const updateContentController =  async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
}
//Delete Content

const deleteContentController =  async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
        }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
}


const getSingleForUserContentController = async(req,res) =>{
    const id = req.params.id;
    // const userid = req.user.id;
    // console.log(userid);
    try{
        // const instructorExist = await Instructor.findById({_id:userid})
        // if(instructorExist){
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
                            cnt1 = cnt1 + 1
                            if(cnt1 == n1){
                                getSingleContent.courseDetailes.splice(0,cnt1)
                                break
                            } 
                        } 
                    }
                    let n2 = getSingleContent.chapterDetailes.length;
                    let cnt2 = 0
                    // console.log(getSingleContent.chapterDetailes);
                    for (const singleId of getSingleContent.chapterDetailes) {
                        if (typeof singleId === 'object' &&  singleId !== null) {
                            // console.log(n1,singleId);
                            const chapter = await Chapter.findById({_id:singleId._id})
                            getSingleContent.chapterDetailes.push(chapter)

                            cnt2 = cnt2 + 1
                            if(cnt2 == n2){
                                getSingleContent.chapterDetailes.splice(0,cnt2)
                                break
                            } 
                        } 
                    }

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
        // }
    } catch (error) {
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({ message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
        })
    }
}

module.exports = {  createContentController,
                    getAllContentController,
                    getSingleContentController,
                    updateContentController,
                    deleteContentController,
                    getSingleForUserContentController
                };