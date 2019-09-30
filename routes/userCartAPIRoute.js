/* eslint-disable camelcase */
var db = require("../models");

module.exports = function (app) {
  // Get cart
  app.get("/api/cart/user/:id", function (req, res) {
    console.log("Get Cart");
    db.UserCartHeader.findAll({ where: { cart_owner_id: req.params.id }, include: [{ model: db.UserCartDetail, include: [db.ProductCatalog] }] })
      .then(cart => {
        res.json(cart);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });


  /* Create a new Cart
    {
        "cart_owner_id": 1,       
        "cart_status": "Open",
        "UserCartDetail": [{
          "product_id": 25,
          "quantity": 1
        },
        {
          "product_id": 56,
          "quantity": 10
        }]
      }
 
  */
  app.post("/api/cart/user", function (req, res) {
    console.log("Create a Cart");
    db.UserCartHeader.findOrCreate(req.body.UserCartHeader, { where: { cart_owner_id: req.body.UserCartHeader.cart_owner_id } })
      .then(createdCart => {
        res.status(200).send(createdCart);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(400);
      });
  });

  // Updates a cart item
  app.put("/api/cart/item/:id", function (req, res) {
    console.log("Updates a cart item quantity");
    db.UserCartDetail.update({ order_status: req.body.order_status }, { where: { id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " updated");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Delete a cart using id
  app.delete("/api/cart/user/:id", function (req, res) {
    console.log("Delete a cart");
    db.UserCartHeader.destroy({ where: { id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " deleted");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });


};