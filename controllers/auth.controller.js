const req = require("express/lib/request");
const authModel = require("../model/auth.model");
exports.pageRegister = (req, res, next) => {
  res.render("auth/register", {
    title: "register",
    
  });
};
exports.createUser = (req, res, next) => {
  const { username, password, repassword } = req.body;
  authModel.createUser(username, password, repassword)
    .then(res.redirect("/auth/login"))
  
}
exports.pageLogin = (req, res, next) => {
  res.render("auth/login", {
    title: "login",
  });
};
exports.loginUser = (req, res, next) => {
  const { username, password } = req.body;

  authModel
    .loginUser(username, password)
    .then((resualt) => {
      req.session.userId = resualt.id;
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("authError", err);
      res.redirect("/auth/login");
    });
};
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
