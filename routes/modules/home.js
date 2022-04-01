const express = require("express");
const router = express.Router();

const Records = require("../../models/records");
const Categories = require("../../models/categories");
router.get("/", (req, res) => {
  let totalAmount = 0
  Records.find()
    .lean()
    .then((records) => {
      records.forEach((record) => {
        // modify mongoose time into Node.js
        const date = record.date.toLocaleDateString(["ban", "id"]);
        record.date=date
        totalAmount+=record.amount;
      });
      Categories.find()
        .lean()
        .sort({_id:"asc"})
        .then((categories) => {
          res.render("index", { records, categories, totalAmount });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
