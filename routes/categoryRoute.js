const express = require("express")
const router = express.Router();

const {authenticateToken} = require("../authenticateToken");

const { addCategoryController,
        getAllCategoryController,
        getSingleCategoryController,
        updateCategoryController,
        deleteCategoryController
    } = require("../contollers/categoryController")
//Create
router.post("/category/create", authenticateToken, addCategoryController )

//Get All data
router.get('/getAllCategory', authenticateToken, getAllCategoryController)

//Get Single Data
router.get('/category/:id' , authenticateToken,getSingleCategoryController)


//Update
router.patch('/category/update/:id', authenticateToken,updateCategoryController)

//Delete
router.delete('/category/delete/:id', authenticateToken, deleteCategoryController)
module.exports = router;