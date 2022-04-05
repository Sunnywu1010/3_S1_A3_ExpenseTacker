const express=require("express")
const router=express.Router()
const Users=require("../../models/users")
router.get("/login",(req,res)=>{
  res.render("login")
})


module.exports=router