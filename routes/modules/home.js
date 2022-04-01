const express = require("express");
const router = express.Router();

const Records = require("../../models/records");
const Categories = require("../../models/categories");
router.get("/", (req, res) => {
  Records.find()
    .lean()
    .then((records) => {
      // modify mongoose time into Node.js
      records.forEach((record) => {
        const date = record.date.toLocaleDateString(["ban", "id"]);
        record.date=date
      });
      Categories.find()
        .lean()
        .then((categories) => {
          // const date=categories.date.toDateString()

          // console.log(date)
          res.render("index", { records, categories });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
