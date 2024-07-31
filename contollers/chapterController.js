const mongoose = require("mongoose");
const express = require("express");
const ObjectId = mongoose.Types.ObjectId;
const Chapter = require("../models/chapterModel");
const ContentVideo = require("../models/contnetVideoModel");
const Course = require("../models/courseModel");
const router = express.Router();
// const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const { HTTPStatusCode, ErrorMessages } = require("../global.js");
const { authenticateToken } = require("../authenticateToken");
const Instructor = require("../models/instructorModel");
//Create
const createChapterController = async (req, res) => {
  let { chapterName, course } = req.body;
  const userid = req.user.id;
  try {
    // const allCourse = await Course.aggregate([
    //     {
    //         $group: {
    //             _id:"$_id",
    //         },
    //     },
    // ]);

    //Course Id Valid or not
    const instructorExist = await Instructor.findById({ _id: userid });
    if (instructorExist) {
      const courseID = await Course.findById({ _id: course });
      const chapterExist = await Chapter.findOne({
        chapterName: chapterName,
        course: course,
      });
      if (chapterExist) {
        return res
          .status(HTTPStatusCode.BAD_REQUEST)
          .json({ message: ErrorMessages.CHAPTER_EXIST });
      }
      const createChapter = await Chapter.create({
        chapterName: chapterName,
        course: courseID,
        createdBy: instructorExist,
      });
      return res.status(HTTPStatusCode.CREATED).json({
        message: ErrorMessages.CREATED,
        data: createChapter,
      });
    }
  } catch (error) {
    return res
      .status(HTTPStatusCode.INTERNAL_SERVER)
      .json({ message: ErrorMessages.INTERNAL_SERVER, error: error.message });
  }
};

//Get All Chapter
const getAllChapterController = async (req, res) => {
  const userid = req.user.id;

  const keyword = req.query.keyword;
  const finalQueryVal = new RegExp(keyword, "i");
  try {
    const getAllChapter = await Chapter.find({ createdBy: userid });
    for (const field of getAllChapter) {
      if (getAllChapter) {
        const courseDetails = await Course.findById({ _id: field.course });
        field.course = courseDetails;
      }
    }
    if (keyword !== "undefined") {
      const searchCheck = (field) => {
        if (
          field.chapterName.match(finalQueryVal) ||
          field.course.name.match(finalQueryVal)
        ) {
          return field;
        }
      };
      const getSearchData = getAllChapter.filter(searchCheck);
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
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
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
        message: ErrorMessages.GETDATA,
        data: getAllChapter,
      });
    }
  } catch (error) {
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
      message: ErrorMessages.INTERNAL_SERVER,
      error: error.message,
    });
  }
};

//Get Single Contnent
const getSingleChapterController = async (req, res) => {
  const id = req.params.id;

  try {
    if (ObjectId.isValid(id)) {
      const chapterdetails = await Chapter.findOne({ _id: id });
      if (chapterdetails) {
        const courseDetails = await Course.findById({
          _id: chapterdetails.course,
        });
        chapterdetails.course = courseDetails;
        return res
          .status(HTTPStatusCode.OK)
          .json({ message: ErrorMessages.GETDATA, data: chapterdetails });
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          message: ErrorMessages.NOT_EXISTS,
        });
      }
    } else {
      return res.status(HTTPStatusCode.BAD_REQUEST).json({
        message: ErrorMessages.WRONG_CREDENTIALS,
      });
    }
  } catch (error) {
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
      message: ErrorMessages.INTERNAL_SERVER,
      error: error.message,
    });
  }
};
//Update
const updateChapterController = async (req, res) => {
  const id = req.params.id;
  const instructorid = req.user.id;
  const instructorExist = await Instructor.findById({ _id: instructorid });
  try {
    if (instructorExist) {
      if (ObjectId.isValid(id)) {
        const ChapterUpdate = await Chapter.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (ChapterUpdate) {
          return res
            .status(HTTPStatusCode.OK)
            .json({ message: ErrorMessages.UPDATED, data: ChapterUpdate });
        } else {
          return res
            .status(HTTPStatusCode.BAD_REQUEST)
            .json({ message: ErrorMessages.NOT_EXISTS });
        }
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          message: ErrorMessages.WRONG_CREDENTIALS,
        });
      }
    }
  } catch (error) {
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
      message: ErrorMessages.INTERNAL_SERVER,
      error: error.message,
    });
  }
};

//Delete
const deleteChapterController = async (req, res) => {
  const id = req.params.id;
  const instructorid = req.user.id;
  const instructorExist = await Instructor.findById({ _id: instructorid });
  try {
    if (instructorExist) {
      if (ObjectId.isValid(id)) {
        const ChapterDelete = await Chapter.findByIdAndDelete({ _id: id });
        if (ChapterDelete) {
          return res.status(HTTPStatusCode.OK).json({
            message: ErrorMessages.DELETED,
            data: ChapterDelete,
          });
        } else {
          return res.status(HTTPStatusCode.BAD_REQUEST).json({
            message: ErrorMessages.NOT_EXISTS,
          });
        }
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          message: ErrorMessages.WRONG_CREDENTIALS,
        });
      }
    }
  } catch (error) {
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
      message: ErrorMessages.INTERNAL_SERVER,
    });
  }
};
const singleChapterForUser = async (req, res) => {
  const id = req.params.id;

  try {
    if (ObjectId.isValid(id)) {
      const chapterdetails = await Chapter.findOne({ _id: id });
      if (chapterdetails) {
        const courseDetails = await Course.findById({
          _id: chapterdetails.course,
        });
        chapterdetails.course = courseDetails;
        return res
          .status(HTTPStatusCode.OK)
          .json({ message: ErrorMessages.GETDATA, data: chapterdetails });
      } else {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          message: ErrorMessages.NOT_EXISTS,
        });
      }
    } else {
      return res.status(HTTPStatusCode.BAD_REQUEST).json({
        message: ErrorMessages.WRONG_CREDENTIALS,
      });
    }
  } catch (error) {
    return res.status(HTTPStatusCode.INTERNAL_SERVER).json({
      message: ErrorMessages.INTERNAL_SERVER,
      error: error.message,
    });
  }
};
module.exports = {
  createChapterController,
  getAllChapterController,
  getSingleChapterController,
  updateChapterController,
  deleteChapterController,
  singleChapterForUser,
};
