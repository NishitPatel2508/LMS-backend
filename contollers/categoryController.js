const mongoose = require("mongoose")
const Category = require("../models/categoryModel")
const ObjectId = mongoose.Types.ObjectId;
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
const Instructor = require("../models/instructorModel");

//Create
const addCategoryController = async(req,res) => {
    const {categoryName} = req.body;
    const userid = req.user.id
    // createdBy = instructorExist;
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            console.log(instructorExist);
            const singleCategory = await Category.findOne({categoryName:categoryName})
            // const instructorInfo = Instructor.findById({_id:createdBy})
            if(singleCategory){
                return res
                    .status(HTTPStatusCode.BAD_REQUEST)
                    .json({message:ErrorMessages.CATEGORY_EXIST})
            }
            const createCategory = await Category.create({
                categoryName:categoryName,
                createdBy:instructorExist
            })
            return res
                .status(HTTPStatusCode.CREATED)
                .json({message:ErrorMessages.CREATED,
                    data:createCategory
                })
        } else {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.INSTRUCTOR_NOT_EXIST,
            })
        }
 
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
}

//Get All
const getAllCategoryController = async(req,res) =>{
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
            const getAllCategory = await Category.find()
            return res
                 .status(HTTPStatusCode.OK)
                 .json({message:ErrorMessages.GETDATA,
                     data:getAllCategory
            })
        }
    }catch{
        return res
        .status(HTTPStatusCode.INTERNAL_SERVER)
        .json({message:ErrorMessages.INTERNAL_SERVER})
    }
}

// Get Single
const getSingleCategoryController = async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id;
    console.log(userid);
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
} 

//UPDATE
const updateCategoryController = async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
                        data:updateCategory,
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
        } else {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.INSTRUCTOR_NOT_EXIST,
            })
        }
     
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
}

//Delete
const deleteCategoryController = async(req,res) =>{
    const id = req.params.id;
    const userid = req.user.id
    try{
        const instructorExist = await Instructor.findById({_id:userid})
        if(instructorExist){
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
        } else {
            return res
                .status(HTTPStatusCode.BAD_REQUEST)
                .json({message:ErrorMessages.INSTRUCTOR_NOT_EXIST,
            })
        }
    }catch{
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
}
module.exports = {addCategoryController,getAllCategoryController,getSingleCategoryController,updateCategoryController,deleteCategoryController}