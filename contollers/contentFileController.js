const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
const Category = require("../models/categoryModel");
const ObjectId = mongoose.Types.ObjectId;
// const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const { HTTPStatusCode, ErrorMessages } = require("../global.js");
const ContentFile = require("../models/contentFileModel");
const Instructor = require("../models/instructorModel");
const Chapter = require("../models/chapterModel");
const { put } = require("@vercel/blob");
const fs = require("fs");
// const vercelblob = require("vercel/blob")
const Course = require("../models/courseModel");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const uploadFileController = async (req, res) => {
  const userid = req.user.id;
  console.log(userid);
  const { chapter, fileName, pdf } = req.body;
  try {
    const instructorExist = await Instructor.findById({ _id: userid });

    if (instructorExist) {
      const chapterInfo = await Chapter.findById({ _id: chapter });
      const uploadFiles = await ContentFile.create({
        chapter: chapterInfo,
        name: fileName,
        pdf: pdf,
        createdBy: instructorExist,
      });
      // console.log(uploadFiles);
      console.log(req.file);

      return res.status(HTTPStatusCode.CREATED).json({
        data: uploadFiles,
        message: ErrorMessages.UPLOAD_SUCCESS,
      });
    } else {
      return res
        .status(HTTPStatusCode.BAD_REQUEST)
        .json({ message: ErrorMessages.INSTRUCTOR_NOT_EXIST });
    }
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      message: ErrorMessages.NOT_FOUND,
      message1: error.message,
    });
  }
};

const getAllContentFileController = async (req, res) => {
  const userid = req.user.id;
  console.log(userid);

  const keyword = req.query.keyword;
  const finalQueryVal = new RegExp(keyword, "i");
  try {
    const instructorExist = await Instructor.findById({ _id: userid });
    if (instructorExist) {
      const getAllFile = await ContentFile.find({ createdBy: userid });
      if (getAllFile) {
        for (const field of getAllFile) {
          const chapter = field.chapter;
          const chapterInfo = await Chapter.findById({ _id: chapter });
          if (chapterInfo) {
            field.chapter = chapterInfo;
            if (chapterInfo) {
              const course = chapterInfo.course;
              if (course) {
                const courseInfo = await Course.findById({ _id: course });
                field.chapter.course = courseInfo;
              }
            }
          }
        }
      }
      if (keyword !== "undefined") {
        const searchCheck = (field) => {
          if (
            field.name.match(finalQueryVal) ||
            field.chapter.chapterName.match(finalQueryVal) ||
            field.chapter.course.name.match(finalQueryVal)
          ) {
            return field;
          }
        };
        const getSearchData = getAllFile.filter(searchCheck);
        if (getSearchData.length > 0) {
          return res.status(HTTPStatusCode.OK).json({
            message: ErrorMessages.GETDATA,
            data: getSearchData,
            //  pagination: {
            //    count,
            //    pageCount,
            //  },
            // message: ErrorMessages.GETDATA,
          });
        } else {
          return res.status(HTTPStatusCode.OK).json({
            message: ErrorMessages.NOT_FOUND,
            // data: getAllCourse,
            //  pagination: {
            //    count,
            //    pageCount,
            //  },
          });
        }
      } else {
        return res.status(HTTPStatusCode.OK).json({
          data: getAllFile,
          message: ErrorMessages.GETDATA,
        });
      }
    }
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      message: ErrorMessages.NOT_FOUND,
      message1: error.message,
    });
  }
};

const getSingleContentFileController = async (req, res) => {
  const userid = req.user.id;
  const id = req.params.id;
  console.log(userid);
  try {
    const instructorExist = await Instructor.findById({ _id: userid });
    if (instructorExist) {
      if (ObjectId.isValid(id)) {
        const getSingleFile = await ContentFile.findById({ _id: id });
        if (getSingleFile) {
          const chapterInfo = await Chapter.findById({
            _id: getSingleFile.chapter,
          });
          if (chapterInfo) {
            getSingleFile.chapter = chapterInfo;
          }
          return res.status(HTTPStatusCode.OK).json({
            data: getSingleFile,
            message: ErrorMessages.GETDATA,
          });
        } else {
          return res.status(HTTPStatusCode.BAD_REQUEST).json({
            message: ErrorMessages.NOT_FOUND,
          });
        }
      } else {
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
          message: ErrorMessages.WRONG_CREDENTIALS,
        });
      }
    }
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      message: ErrorMessages.NOT_FOUND,
      message1: error.message,
    });
  }
};
const updateContentFileController = async (req, res) => {
  console.log(req.file);
  const userid = req.user.id;
  const id = req.params.id;
  console.log(userid);
  try {
    const instructorExist = await Instructor.findById({ _id: userid });
    if (instructorExist) {
      if (ObjectId.isValid(id)) {
        const updatedFile = await ContentFile.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        console.log(updatedFile);
        if (updatedFile) {
          return res.status(HTTPStatusCode.OK).json({
            data: updatedFile,
            message: ErrorMessages.UPDATED,
          });
        } else {
          return res.status(HTTPStatusCode.BAD_REQUEST).json({
            message: ErrorMessages.NOT_FOUND,
          });
        }
      } else {
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
          message: ErrorMessages.WRONG_CREDENTIALS,
        });
      }
    }
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      message: ErrorMessages.NOT_FOUND,
      message1: error.message,
    });
  }
};
const deleteContentFileController = async (req, res) => {
  const userid = req.user.id;
  const id = req.params.id;
  console.log(userid);
  try {
    const instructorExist = await Instructor.findById({ _id: userid });
    if (instructorExist) {
      if (ObjectId.isValid(id)) {
        const deletedFile = await ContentFile.findByIdAndDelete({ _id: id });
        if (deletedFile) {
          return res.status(HTTPStatusCode.OK).json({
            data: deletedFile,
            message: ErrorMessages.DELETED,
          });
        } else {
          return res.status(HTTPStatusCode.BAD_REQUEST).json({
            message: ErrorMessages.NOT_FOUND,
          });
        }
      } else {
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
          message: ErrorMessages.WRONG_CREDENTIALS,
        });
      }
    }
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      message: ErrorMessages.NOT_FOUND,
      message1: error.message,
    });
  }
};

module.exports = {
  uploadFileController,
  getAllContentFileController,
  getSingleContentFileController,
  updateContentFileController,
  deleteContentFileController,
};
