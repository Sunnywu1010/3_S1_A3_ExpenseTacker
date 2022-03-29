const express = require("express");
const router = express.Router();

const expenseTracker = require("../../models/expenseTracker");
router.get("/", (req, res) => {
  expenseTracker
    .find()
    .lean()
    .then((trackers) => {
      res.render("index", { trackers });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports=router