const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
// const FacebookStrategy = require("passport-facebook").Strategy;
module.exports = (app) => {
  // initialize Passport module
  app.use(passport.initialize());
  app.use(passport.session());
  // determine if user exist
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        Users.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash("error_msg", "This email is not registered!")
              );
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(
                  null,
                  false,
                  req.flash("error_msg", "Email or Password incorrect.")
                );
              }
              return done(null, user);
            });
          })
          .catch((err) => done(err, false));
      }
    )
  );
  // set serializeUser and deserializeUser
  // serializeUser: if user exist, set user.id in to session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // deserializeUser: if need user info, then find it by user.id
  passport.deserializeUser((id, done) => {
    Users.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};