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
    Array.from(UserList, (user) => bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user.password.toString(), salt))
      .then((hash) => User.create({
        name: user.name,
        email: user.email,
        password: hash,
      })
      ))
  ).then(() => {
    console.log("User data done.");
    process.exit();
  });
});





module.exports = db;

// db.once("open", () => {
//   Promise.all(
//     Array.from(UserList, (_, i) => {
//       return bcrypt
//         .genSalt(10)
//         .then((salt) => bcrypt.hash(UserList[i].password, salt))
//         .then((hash) =>
//           User.create({
//             name: UserList[i].name,
//             email: UserList[i].email,
//             password: hash,
//           })
//         );
//     })
//   ).then(() => {
//     console.log("Insert user data.");
//   });

//   Category.find()
//     .lean()
//     .then((categories) => {
//       RecordsList.forEach((record) => {
//         const categoryName = CategoryList.find(
//           (category) => category.id === record.categoryId
//         ).name;
//         const categoryId = categories.find(
//           (category) => category.name === categoryName
//         )._id;

//         const userName = UserList.find(
//           (user) => user.id === record.userId
//         ).name;

//         User.findOne({ name: userName })
//           .lean()
//           .then((user) => {
//             Records.create({
//               name: record.name,
//               date: record.date,
//               amount: record.amount,
//               userId: user._id,
//               categoryId: categoryId,
//             });
//           });
//       });
//     })
//     .then(() => {
//       console.log("Insert record data.");
//     })
//     .catch((err) => console.log(err));
//     process.exit()
// });
