const mongoose = require("mongoose")
const express =require("express")
const router = express.Router()
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/userModel")
const {HTTPStatusCode,ErrorMessages} = require("../global.ts")
router.post('/user/setnewpassword', async(req,res) =>{
    const {password} = req.body;
    try {
        // const updatePassword = await User.
    } catch (error) {
        return res
            .status(HTTPStatusCode.INTERNAL_SERVER)
            .json({message:ErrorMessages.INTERNAL_SERVER})
    }
})
module.exports = router;