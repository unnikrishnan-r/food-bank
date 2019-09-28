/* eslint-disable camelcase */
var db = require("../models");

module.exports = function (app) {

  //Get all users
  app.get("/api/users", function (req, res) {
    console.log("Get All Users");
    db.User.findAll({})
      .then(function (userList) {
        res.json(userList);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });

  });

  //Get users by role
  app.get("/api/users/:role", function (req, res) {
    console.log("Get Users by Role Type " + req.params.role);
    db.User.findAll({ include: [{ model: db.UserRole, where: { user_role_name: req.params.role } }] })
      .then(function (userList) {
        res.render("customerDashboard", { userList: userList, productList: {} });
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });

  });
};
