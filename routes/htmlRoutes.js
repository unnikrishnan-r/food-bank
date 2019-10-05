var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/addProductForm", function (req, res) {
    res.render("addProduct", { layout: "vendor" });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.status(404).render("404");
  });
};
