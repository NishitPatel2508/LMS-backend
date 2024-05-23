const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const Course = require("../models/courseModel")
const Chapter = require('../models/chapterModel');
const Category = require("../models/categoryModel")
const Subcategory = require("../models/subcategoryModel")
const ProgrammingLanguage = require("../models/programmingLanguagesModel")
const Language = require("../models/languageModel")
const Instructor = require("../models/instructorModel");
const ContentVideo = require("../models/contnetVideoModel")
const ContentFile = require("../models/contentFileModel")
const Content = require("../models/contentModel")
const Review = require("../models/reviewModel")
const Revenue = require("../models/revenueModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const {authenticateToken} = require("../authenticateToken");
const Contents = require("../models/contentModel");
const auth = require("../auth")
// async function db(records) {
//     const dashboarddetails = [];
//     const errmsg = [];
//     try {
//       for (const i of records) {
        
//             const newRecord = await i.findOne({createdBy: userid})
//             console.log(newRecord);
//             dashboarddetails.push(newRecord);
        
//       }
//       return dashboarddetails;
//     } catch (error) {
//       errmsg.push(error.message);
//       return errmsg;
//     }
//   }
//Dashboard
router.get('/dashboard' ,authenticateToken, async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    console.log(userid);
    const detailsForDashboard = []
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            console.log(instructorExist);
            // const records = [Course,Language,Category,Subcategory,ProgrammingLanguage,Chapter,ContentVideo,Content]
            // const allDetails = db(records)
            const courseData = await Course.find({createdBy: userid})
            // var courseJson = {
            //     Courses :courseData
            // }
            detailsForDashboard.push({
                Courses :courseData
            })
            const languageData = await Language.find({createdBy: userid})
            var LanguagesJson = {
                Languages :languageData
            }
            detailsForDashboard.push(LanguagesJson)
            const categoryData = await Category.find({createdBy:userid})
            var categoryJson = {
                Categories : categoryData
            }
            detailsForDashboard.push(categoryJson)
            const subCategoryData = await Subcategory.find({createdBy:userid})
            var subCategoryJson = {
                Subcategories : subCategoryData
            }
            detailsForDashboard.push(subCategoryJson)
            const programmingLanguageData = await ProgrammingLanguage.find({createdBy:userid})
            var programmingLanguageJson = {
                ProgrammingLanguages : programmingLanguageData
            }
            detailsForDashboard.push(programmingLanguageJson)
            const chapterData = await Chapter.findOne({createdBy:userid})
            // detailsForDashboard.push("Chapters: ",chapterData)
            var chapterJson = {
                Chapteres : chapterData
            }
            detailsForDashboard.push(chapterJson)
            const contentVideoData = await ContentVideo.find({createdBy:userid})
            var contentVideoJson = {
                ContentVideoes : contentVideoData
            }
            detailsForDashboard.push(contentVideoJson)
            const contentFileData = await ContentFile.find({createdBy:userid})
            var contentFileJson = {
                ContentFiles : contentFileData
            }
            detailsForDashboard.push(contentFileJson)
            // detailsForDashboard.push("Content Videoes: ",contentVideoData)
            const contentData = await Content.find({createdBy:userid})
            var contentJson = {
                Contents : contentData
            }
            detailsForDashboard.push(contentJson)
            // detailsForDashboard.push("Contentes ",contentData)

            const revenueData = await Revenue.find({instructorInfo:userid})
            var revenueJson = {
                Revenue: revenueData
            }
            detailsForDashboard.push(revenueJson)
            return res
                .status(HTTPStatusCode.OK)
                .json({
                    message:ErrorMessages.GETDATA,
                    data: detailsForDashboard
                })
        }
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({
                message:ErrorMessages.INTERNAL_SERVER,
                error:error.message
            })
    }
})
module.exports = router;