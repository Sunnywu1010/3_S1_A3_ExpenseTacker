const Category = require("../categories");
const db = require("../../config/mongoose");
const categoryList = require("./category.json").results;
db.once("open", () => {
  Promise.all(
    Array.from(categoryList, (category) => {
      return Category.create({
        id: category.id,
        name: category.name,
        icon: category.icon,
      });
    })
  ).then(() => {
    console.log("Category create done.");
    process.exit();
  });
});
module.exports = db;
