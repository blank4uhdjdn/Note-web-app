const express=require("express")
const Otp =require("../models/otp")
const { verifyOtp } = require("../controller/auth.controller")


const router=express.Router()

router.post("/verifyOtp",verifyOtp)



module.exports=router    