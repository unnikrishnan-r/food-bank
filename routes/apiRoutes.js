var db = require("../models");

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
