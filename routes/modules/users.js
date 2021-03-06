const express=require("express")
const router=express.Router()
const Users=require("../../models/users")
const bcrypt = require("bcryptjs");
const passport = require("passport");
// get LOGIN page
router.get("/login",(req,res)=>{
  res.render("login")
})
// LOGIN
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
// get REGISTER page
router.get("/register",(req,res)=>{
  res.render("register");
})
// REGISTER account
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
        errors.push({ message: "Email is already exists" });
        return res.render("register", {
          errors,
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
          .then(() => res.redirect("login"))
          .catch((err) => console.log(err));
      }
    })
    .catch((error) => console.log(error));
})
// LOGOUT
router.get("/logout",(req,res)=>{
  req.logout()
  req.flash("success_msg", "You already logout!");
  res.redirect("/users/login")
})


module.exports=router