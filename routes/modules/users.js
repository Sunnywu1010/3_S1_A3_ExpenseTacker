const express=require("express")
const router=express.Router()
const Users=require("../../models/users")
const bcrypt = require("bcryptjs");
router.get("/login",(req,res)=>{
  res.render("login")
})

router.get("/register",(req,res)=>{
  res.render("register");
})
router.post("/register",(req,res)=>{
  const { name, email, password, confirmPassword } = req.body;
  // error flash message
  const errors = [];

  if (!email || !password || !confirmPassword) {
    errors.push({
      message: "Email and Password must be filled to proceed.",
    });
  }
  if (password !== confirmPassword) {
    errors.push({
      message: "The two passwords must match to proceed.",
    });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: "Email already in the database." });
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return bcrypt
          .genSalt(10) // salt: complex index 10
          .then((salt) => bcrypt.hash(password, salt)) // create hash with salt
          .then((hash) =>
            Users.create({
              name,
              email,
              password: hash, //hash which is created to be password
            })
          )
          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((error) => console.log(error));
})
// router.get("/logout",(req,res)=>{
//   req.logout()
//   res.redirect("/users/login")
// })


module.exports=router