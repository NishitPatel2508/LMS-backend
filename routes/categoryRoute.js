const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const Category = require("../models/categoryModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
//Create
router.post("/category/create", async(req,res) =>{
    const {categoryName} = req.body;
    try{
        const singleCategory = await Category.findOne({categoryName:categoryName})
        if(singleCategory){
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.CATEGORY_EXIST})
        }
        const createCategory = await Category.create({
            categoryName:categoryName
        })
        return res
            .status(HTTPStatusCode.CREATED)
            .json({message:ErrorMessages.CREATED,
                data:createCategory
            })
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get All data
router.get('/getAllCategory', async(req,res) =>{
    try{
        const getAllCategory = await Category.find()
        return res
             .status(HTTPStatusCode.OK)
             .json({message:ErrorMessages.GETDATA,
                 data:getAllCategory
        })
    }catch{
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})

//Get Single Data
router.get('/category/:id' , async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const singleCategory = await Category.findOne({_id:id})
            if(singleCategory){
                return res
                    .status(HTTPStatusCode.OK)
                    .json({message:ErrorMessages.GETDATA,
                        data:singleCategory
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
router.patch('/category/update/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const updateCategory = await Category.findByIdAndUpdate(id, req.body,
                {
                    new:true
                }
            )
           if(updateCategory){
                return res
                .status(HTTPStatusCode.OK)
                .json({message:ErrorMessages.UPDATED,
                    data:updateCategory
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
router.delete('/category/delete/:id', async(req,res) =>{
    const id = req.params.id;
    try{
        if(ObjectId.isValid(id)){
            const deleteCategory = await Category.findByIdAndDelete(id)
           if(deleteCategory){
                return res
                .status(HTTPStatusCode.OK)
                .json({message:ErrorMessages.DELETED,
                    data:deleteCategory
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