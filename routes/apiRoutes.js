var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/getProductList", function(req, res) {
    console.log("Get All products");
    db.ProductCatalog.findAll({}).then(function(productList) {
      res.json(productList);
    });
  });

  // Create a new Product
  app.post("/api/createProduct", function(req, res) {
    console.log("Create a product");

    db.ProductCatalog.create(req.body).then(function(createdProduct) {
      res.sendStatus(200);
    });
  });

  // Delete an product using id
  app.delete("/api/deleteProduct/:id", function(req, res) {
    console.log("Delete a product");

    db.ProductCatalog.destroy({ where: { id: req.params.id } }).then(function(deletedProduct) {
      res.sendStatus(200);
    });
  });
};
