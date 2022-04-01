// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const home = require("./modules/home");
const records = require("./modules/records");
// route setting
router.use("/", home);
router.use("/records", records);
// export
module.exports = router;
