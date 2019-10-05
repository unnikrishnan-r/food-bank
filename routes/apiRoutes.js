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
  app.get("/api/products/buyer/:id", function (req, res) {
    console.log("Get All vendor products");
    db.ProductCatalog.findAll({ include: [{ model: db.User, as: "Vendor", where: { id: req.params.id } }] })
      .then(productList => {
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
          vendor = { id: 0 }
        }

        res.render("customerDashboard", { layout: "buyer", userList: {}, productList: productList, vendor: vendor });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(400);
      });
  });

  app.get("/api/products/vendor/:id", function (req, res) {
    console.log("Get All vendor products");
    db.ProductCatalog.findAll({ include: [{ model: db.User, as: "Vendor", where: { id: req.params.id } }] })
      .then(productList => {
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
          vendor = { id: 0 }
        }

        res.render("vendorDashboard", { layout: "vendor", userList: {}, productList: productList, vendor: vendor });
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
