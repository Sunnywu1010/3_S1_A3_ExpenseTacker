module.exports = {
  authenticator: (req, res, next) => {
    // req.isAuthenticated() :return boolean
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "Please log in to access the requested page");
    res.redirect("/users/login");
  },
};
