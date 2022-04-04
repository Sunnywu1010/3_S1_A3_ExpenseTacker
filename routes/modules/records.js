const express = require("express");
const router = express.Router();
const Categories = require("../../models/categories");
const Records = require("../../models/records");

router.get("/new", (req, res) => {
  Categories.find()
    .lean()
    .sort({ name: "asc" })
    .then((category) => {
      res.render("new", { category });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Records.findById(id)
    .lean()
    .then((record) => {
      const categoryId = record.categoryId;
      // modify mongoose time into Node.js, this format is dd/mm/yyyy
      const date = record.date.toLocaleDateString(["ban", "id"]);
      // change the date format into yyyy-mm-dd, in order to fit input value's format
      let [dd, mm, yyyy] = date.split("/");
      if (Number(dd) < 10) {
        dd = "0" + dd;
      }
      if (Number(mm) < 10) {
        mm = "0" + mm;
      }
      const dateArr = [yyyy, mm, dd];
      const dateValue = dateArr.join("-");
      record.date = dateValue;
      Categories.findById(categoryId)
        .lean()
        .then((category) => {
          const categoryName = category.name;
          Categories.find()
            .lean()
            .sort({ name: "asc" })
            .then((category) => {
              res.render("edit", { record, categoryName, category });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
