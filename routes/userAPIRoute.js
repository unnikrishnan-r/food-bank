/* eslint-disable camelcase */
var db = require("../models");
var Sequelize = require("sequelize");
var moment = require("moment");
var Op = Sequelize.Op;

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
      .then(userList => {

        if (userList.length > 0) {
          res.redirect(`/api/users/${req.params.role}/${userList[0].id}`);
        }
        else {
          res.render("customerDashboard");
        }

      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });

  });

  app.get("/api/users/:role/:id", function (req, res) {
    console.log("Get Users by Role Type " + req.params.role);
    db.User.findAll({ include: [{ model: db.UserRole, where: { user_role_name: req.params.role } }] })
      .then(userList => {

        var vendorList = userList;
        var today = new Date();

        if (userList.length > 0) {

          return db.ProductCatalog.findAll({
            where: { [Op.and]: [{ product_current_qty: { [Op.gt]: 0 } }, { product_expiry_date: { [Op.gte]: today } }] },
            include: [{ model: db.User, as: "Vendor", where: { id: req.params.id } }],
            order: [[Sequelize.col('ProductCatalog.product_perishable'), 'DESC'],
            Sequelize.col('ProductCatalog.product_expiry_date')]
          }).then(productList => {
            productList.map(product => {
              const productObj = product.toJSON();
              productObj.createdAt = moment(productObj.product_expiry_date).format("MM/DD/YYYY");
              return productObj;
            });

            var vendor;

            if (productList.length > 0) {
              vendor = productList[0].Vendor;
            }
            else {
              vendor = { id: 0, user_name: '' }
            }
            res.render("customerDashboard", { layout: "buyer", userList: vendorList, productList: productList, vendor: vendor });
          })
            .catch(error => {
              console.error(error);
              res.sendStatus(400);
            });
        }
        else {
          res.render("customerDashboard");
        }

      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });

  });

};