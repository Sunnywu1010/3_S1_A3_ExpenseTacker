const bcrypt = require("bcryptjs");
const User = require("../users");
const db = require("../../config/mongoose");
const UserList = require("./user.json").results;

db.once("open", () => {
  Promise.all(
    Array.from(UserList, (user) =>
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password.toString(), salt))
        .then((hash) =>
          User.create({
            name: user.name,
            email: user.email,
            password: hash,
          })
        )
    )
  ).then(() => {
    console.log("User data done.");
    process.exit();
  });
});

module.exports = db;

