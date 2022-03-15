// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const home = require("./modules/home");
const tracker = require("./modules/tracker");
// route setting
router.use("/", home);
router.use("/tracker", tracker);
// export
module.exports = router;
