// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const home = require("./modules/home");
const records = require("./modules/records");
const users = require("./modules/users");
// route setting
router.use("/", home);
router.use("/records", records);
router.use("/users", users);
// export
module.exports = router;
