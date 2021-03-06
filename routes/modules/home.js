const express = require("express");
const router = express.Router();

const Records = require("../../models/records");
const Categories = require("../../models/categories");
// get HOME page
router.get("/", (req, res) => {
  const userId = req.user._id;
  let totalAmount = 0;
  Records.find({ userId })
    .lean()
    .then((records) => {
      records.forEach((record) => {
        // modify mongoose time into Node.js
        const date = record.date.toLocaleDateString(["ban", "id"]);
        record.date = date;
        totalAmount += record.amount;
        // get the icon class from category Model
        const categoryId = record.categoryId;
        Categories.findById(categoryId)
          .lean()
          .then((category) => {
            const categoryIcon = category.icon;
            record.categoryId = categoryIcon;
          })
          .catch((error) => {
            console.log(error);
          });
      });
      Categories.find()
        .lean()
        .sort({ _id: "asc" })
        .then((categories) => {
          res.render("index", { records, categories, totalAmount });
        })
        .catch((error) => {
          console.log(error);
        });
    })

    .catch((error) => {
      console.log(error);
    });
});
// get CATEGORY SEARCH page
router.get("/category", (req, res) => {
  const userId = req.user._id;
  let totalAmount = 0;
  const categoryName = req.query.category;
  const categoryArr = [categoryName];
  Categories.findOne({ name: categoryName }).then((category) => {
    const categoryId = category._id;
    Records.find({ userId,categoryId })
      .lean()
      .then((records) => {
        records.forEach((record) => {
          // modify mongoose time into Node.js
          const date = record.date.toLocaleDateString(["ban", "id"]);
          record.date = date;
          totalAmount += record.amount;
          // get the icon class from category Model
          const categoryId = record.categoryId;
          Categories.findById(categoryId)
            .lean()
            .then((category) => {
              const categoryIcon = category.icon;
              record.categoryId = categoryIcon;
            })
            .catch((error) => {
              console.log(error);
            });
        });
        Categories.find()
          .lean()
          .sort({ _id: "asc" })
          .then((categories) => {
            res.render("index", {
              records,
              categories,
              totalAmount,
              categoryArr,
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
});
module.exports = router;
