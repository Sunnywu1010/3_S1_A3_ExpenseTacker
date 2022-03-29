// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const home = require("./modules/home");
const trackers = require("./modules/trackers");
// route setting
router.use("/", home);
router.use("/trackers", trackers);
// export
module.exports = router;
