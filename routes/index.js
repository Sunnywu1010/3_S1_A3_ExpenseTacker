// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const home = require("./modules/home");
const records = require("./modules/records");
const users = require("./modules/users");
const { authenticator } = require("../middleware/auth");
// route setting
router.use("/records", authenticator,records);
router.use("/users", users);
router.use("/", authenticator,home);
// export
module.exports = router;
