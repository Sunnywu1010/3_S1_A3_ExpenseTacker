const express = require("express");
const router = express.Router();
const Categories = require("../../models/categories");
const records = require("../../models/records");
const Records = require("../../models/records");
// get new page
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
// EDIT expense
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Records.findById({ userId, _id: id })
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
// CREATE expense
router.post("/", (req, res) => {
  const userId = req.user._id;
  const { name, date, category, amount } = req.body;
  Categories.findOne({ name: category })
    .then((category) => {
      const categoryId = category._id;
      Records.create({
        name,
        date,
        amount,
        userId,
        categoryId,
      });
    })
    .catch((error) => {
      console.log(error);
    })

    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Records.findById(id)
    .then((record) => {
      record.remove();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});
// router.post("/", (req, res) => {
//   const { name, date, category, amount } = req.body;
//   Records.create({
//     name, date, category, amount
//   }).then(()=>{
//     res.redirect("/")
//   })
//    .catch((error) => {
//       console.log(error);
//     });
// });
module.exports = router;
