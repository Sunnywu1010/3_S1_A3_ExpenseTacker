const express = require("express");
const router = express.Router();
const Categories = require("../../models/categories");
const Records = require("../../models/records");

router.get("/new",(req,res)=>{
Categories.find()
  .lean()
  .sort({ name: "asc" })
  .then((category) => {
    res.render("new", { category });
  })
  .catch((error) => {
    console.log(error);
  });
})
router.get("/:id/edit", (req, res) => {
  const id=req.params.id
  Records.findById(id)
    .lean()
    .then((record) => {
      const categoryId=record.categoryId
      Categories.findById(categoryId)
        .lean()
        .then((category) => {
          const categoryName = category.name
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
