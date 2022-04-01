const bcrypt = require("bcryptjs");

const User = require("../users");
const Record = require("../records");
const Category = require("../categories");

const db = require("../../config/mongoose");

const UserList = require("./user.json").results;
const RecordsList = require("./records.json").results;
const CategoryList = require("./category.json").results;

db.once("open", () => {
  Promise.all(
    Array.from(UserList, (user) =>
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password.toString(), salt))
        .then((hash) =>
          User.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: hash,
          })
        )
    )
  )
    .then(() => {
      console.log("User data done.");
    })
    .then(() => {
      Promise.all(
        Array.from(RecordsList, (record) => {
          // find the UserId and CategoryId from records.json, as recordUserId and recordCategoryId
          const recordUserId = record.userId;
          const recordCategoryId = record.categoryId;
          // use recordUserId and recordCategoryId to find the specific user and category
          // then use the specific user and category to find each name, as userName and categoryName

          const userName = UserList.find(
            (user) => user.id === recordUserId
          ).name;
          const categoryName = CategoryList.find(
            (category) => category.id === recordCategoryId
          ).name;

          // after finding each name (userName and categoryName)
          // look into the Model(User and Category)
          //  find out the one which match userName and categoryName
          return User.findOne({ name: userName })
            .lean()
            .then((user) => {
              return Category.findOne({ name: categoryName })
                .lean()
                .then((category) => {
                  // then take out that one's _id, as userId and categoryId
                  const userId = user._id;
                  const categoryId = category._id;
                  const categoryIcon = category.icon;
                  return Record.create({
                    name: record.name,
                    date: record.date,
                    amount: record.amount,
                    // put userId and categoryId into Record Model
                    userId: userId,
                    categoryId: categoryId,
                    categoryIcon: categoryIcon,
                  });
                });
            })
            .catch((error) => console.log(error));
        })
      ).then(() => {
        console.log("record data done.");
        process.exit();
      });
    })
    
});

module.exports = db;
