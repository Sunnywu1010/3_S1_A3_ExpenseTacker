const express=require("express")
const router=express.Router()
const Users=require("../../models/users")
router.get("/login",(req,res)=>{
  res.render("login")
})
// router.get("/logout",(req,res)=>{
//   req.logout()
//   res.redirect("/users/login")
// })


module.exports=router