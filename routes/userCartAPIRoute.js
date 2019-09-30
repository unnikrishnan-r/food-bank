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
        "product_id": 25,
        "quantity": 1
      } 
  */
  app.post("/api/cart/user", function (req, res) {
    console.log("Create a Cart");

    db.sequelizeConnection.transaction(transaction => {
      return db.UserCartHeader.findOrCreate({ where: { cart_owner_id: req.body.cart_owner_id }, defaults: { cart_owner_id: req.body.cart_owner_id, cart_status: req.body.cart_status }, transaction }).then(createdCart => {

        console.log("Find/Create successful", createdCart[0]);

        db.UserCartDetail.create({ cart_id: createdCart[0].id, product_id: req.body.product_id, quantity: req.body.quantity }, transaction)
          .then(createCartDetail => {
            console.log(createCartDetail);

            res.status(200).send(createdCart);
          })
          .catch(function (error) {
            console.log(error);
            res.sendStatus(400);
          });

      }).catch(function (error) {
        console.log(error);
        res.sendStatus(400);
      })
    });
  });

  // Updates a cart item
  app.put("/api/cart/item", function (req, res) {
    console.log("Updates a cart item quantity");
    db.UserCartDetail.update({ quantity: req.body.quantity }, { where: { id: req.body.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " updated");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Delete a cart item
  app.delete("/api/cart/item", function (req, res) {
    console.log("Delete a cart");
    db.UserCartDetail.destroy({ where: { id: req.body.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " deleted");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Delete a cart using id
  app.delete("/api/cart/user", function (req, res) {
    console.log("Delete a cart");
    db.UserCartHeader.destroy({ where: { id: req.body.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " deleted");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });


};