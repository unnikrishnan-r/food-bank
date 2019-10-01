var db = require("../models");
var moment = require("moment");

module.exports = function (app) {
  // Get all products
  app.get("/api/products", function (req, res) {
    console.log("Get All products");
    db.ProductCatalog.findAll({})
      .then(productList => {
        res.json(productList);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(400);
      });
  });

  // Get all vendor products
  app.get("/api/products/vendor/:id", function (req, res) {
    console.log("Get All vendor products");
    db.ProductCatalog.findAll({ include: [{ model: db.User, as: "Vendor", where: { id: req.params.id } }] })
      .then(productList => {
        /*productList.map(product => {
          product.product_expiry_date = moment(product.product_expiry_date, "YYYY-MM-DD").format("MM/DD/YYYY");
        });*/

        res.render("customerDashboard", { layout: "buyer", userList: {}, productList: productList });

        //TODO: render correct view based on current logged in user's role
        //res.render("vendorDashboard", { layout: "vendor", userList: {}, productList: productList });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(400);
      });
  });

  // Create a new Product
  app.post("/api/products", function (req, res) {
    console.log("Create a product");

    db.ProductCatalog.create(req.body)
      .then(createdProduct => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(400);
      });
  });

  // Delete an product using id
  app.delete("/api/products/:id", function (req, res) {
    console.log("Delete a product");

    db.ProductCatalog.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedProduct => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(400);
      });
  });

};
