const express=require("express")
const { handlesignup, handlelogin, handlelogout } = require("../controller/auth.controller")
const router=express.Router()

router.post("/signup",handlesignup)
router.post("/login",handlelogin)
router.post("/logout",handlelogout)

module.exports=router    