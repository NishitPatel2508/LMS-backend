const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const Subcategory = require("../models/subcategoryModel")
const {HTTPStatusCode, ErrorMessages} = require("../global.ts")
const Category = require("../models/categoryModel")
//Create
router.post("/subCategory/create", async(req,res) =>{
    const {subCategoryName,categoryId} = req.body;
    try{
        const category = await Category.findById({_id:categoryId})
        const singleSubCategory = await Subcategory.findOne({subCategoryName:subCategoryName})
        if(singleSubCategory){
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.SUBCATEGORY_EXIST})
        }
        const createSubCategory = await Subcategory.create({
            categoryId:categoryId, 
            subCategoryName:subCategoryName
        })
        return res
            .status(HTTPStatusCode.CREATED)
            .json({message:ErrorMessages.CREATED,
                SubCategory:createSubCategory,

            })
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get All data
router.get('/getAllSubCategory', async(req,res) =>{
    try{
        const getAllSubCategory= await Subcategory.find()
        return res
             .status(HTTPStatusCode.OK)
             .json({message:ErrorMessages.GETDATA,
                subCategory:getAllSubCategory
        })
    }catch{
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get Single Data
router.get('/subCategory/:id' , async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const singleSubCategory = await Subcategory.findOne({_id:id})
            if(singleSubCategory){
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
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
    
})

//Update
router.patch('/subCategory/update/:id', async(req,res) =>{
    const id = req.params.id;
    try{
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
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Delete
router.delete('/subCategory/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try{
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
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

module.exports = router;