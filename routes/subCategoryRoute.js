const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const Subcategory = require("../models/subcategoryModel")
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const Category = require("../models/categoryModel")
const {authenticateToken} = require("../authenticateToken")
const Instructor = require("../models/instructorModel");
//Create
router.post("/subCategory/create", authenticateToken,async(req,res) =>{
    const {subCategoryName,category} = req.body;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        console.log(instructorExist);
        if(instructorExist){
            const categoryInfo = await Category.findById({_id:category})
            const singleSubCategory = await Subcategory.findOne({subCategoryName:subCategoryName})
            if(singleSubCategory){
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.SUBCATEGORY_EXIST})
            }
            const createSubCategory = await Subcategory.create({
                category:categoryInfo, 
                subCategoryName:subCategoryName,
                createdBy:instructorExist                                       
            })
                return res
                    .status(HTTPStatusCode.CREATED)
                    .json({message:ErrorMessages.CREATED,
                        SubCategory:createSubCategory,
                    
                })
        
            } 
    
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get All data
router.get('/getAllSubCategory', authenticateToken,async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllSubCategory= await Subcategory.find()
            if(getAllSubCategory){
                for (const fieldNames of getAllSubCategory) {
                    const categoryInfo = await Category.findById({_id:fieldNames.category})
                    if(categoryInfo){
                        fieldNames.category = categoryInfo
                    }
                }
                return res
                 .status(HTTPStatusCode.OK)
                 .json({message:ErrorMessages.GETDATA,
                    subCategory:getAllSubCategory
                })
            }
        }
    }
    catch (error){
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER,
            error :error.message
            
        })
    }
})

//Get Single Data
router.get('/subCategory/:id' , authenticateToken,async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const singleSubCategory = await Subcategory.findOne({_id:id})
                if(singleSubCategory){
                    const categoryInfo = await Category.findById({_id:singleSubCategory.category})
                    if(categoryInfo){
                        singleSubCategory.category = categoryInfo
                    }
                    return res
                        .status(HTTPStatusCode.OK)
                        .json({message:ErrorMessages.GETDATA,
                            subCategory:singleSubCategory
                        })
                }
                else{
                    return res
                        .status(HTTPStatusCode.BAD_REQUEST)
                        .json({message:ErrorMessages.NOT_EXISTS})
                }
            }
            else{
                return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.WRONG_CREDENTIALS})
            }
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
    
})

//Update
router.patch('/subCategory/update/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const updateSubCategory = await Subcategory.findByIdAndUpdate(id, req.body,
                    {
                        new:true
                    }
                )
               if(updateSubCategory){
                    return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.UPDATED,
                        subCategory:updateSubCategory
                    })
               }
               else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.NOT_EXISTS})
               }
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.WRONG_CREDENTIALS,
                })
            }
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Delete
router.delete('/subCategory/delete/:id',authenticateToken, async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            if(ObjectId.isValid(id)){
                const deleteSubCategory = await Subcategory.findByIdAndDelete(id)
               if(deleteSubCategory){
                    return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.DELETED,
                        subCategory:deleteSubCategory
                    })
               }
               else{
                    return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.NOT_EXISTS})
               }
            }
            else{
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.WRONG_CREDENTIALS,
                })
            }
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

module.exports = router;