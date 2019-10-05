/* eslint-disable camelcase */
var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function (app) {
  // Get cart
  app.get("/api/cart/user/:id", function (req, res) {
    console.log("Get Cart");
    db.UserCartHeader.findAll({ where: { cart_owner_id: req.params.id }, include: [{ model: db.UserCartDetail, include: [db.ProductCatalog] }] })
      .then(cartList => {

        if (cartList && cartList.UserCartDetail) {
          cartList.UserCartDetail = cartList.UserCartDetail.map(order => {
            const orderObj = order.toJSON();
            orderObj.createdAt = moment(orderObj.createdAt).format("MM/DD/YYYY");
            return orderObj;
          });
        }

        res.render("customerCart", { layout: "buyer", cart: cartList });
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });


  /* Create a new Cart
    {
        "cart_owner_id": 1,       
        "cart_status": "Open",
        "UserCartDetail" : {
          "product_id": 25,
          "quantity": 1
        }
       
      } 
  */
  app.post("/api/cart/user", function (req, res) {
    console.log("Create a Cart");

    var cartDetails = req.body.UserCartDetail;

    db.sequelizeConnection.transaction(t => {

      //Create an Cart Header
      return db.UserCartHeader.findOrCreate({ where: { cart_owner_id: req.body.cart_owner_id }, defaults: { cart_owner_id: req.body.cart_owner_id, cart_status: req.body.cart_status }, transaction: t }).then(createdCart => {
        var orderPromises = [];

        //Create multiple cart details
        for (let i = 0; i < cartDetails.length; i++) {
          orderPromises.push(
            db.UserCartDetail.findOrCreate({ where: { cart_id: createdCart[0].id }, defaults: { cart_id: createdCart[0].id, product_id: cartDetails[i].product_id, quantity: cartDetails[i].quantity }, transaction: t })
          );
        }

        //Update order cart detail if it already exists
        return Sequelize.Promise.all(orderPromises).then(order => {
          var updatePromises = [];

          for (let k = 0; k < order.length; k++) {

            console.log(order[k][0]);
            console.log(order[k][0].dataValues);

            if (!order[k].isNewRecord) {
              let newQty = parseInt(order[k][0].dataValues.quantity) + parseInt(cartDetails[k].quantity);

              updatePromises.push(db.UserCartDetail.update({ quantity: newQty }, { where: { id: order[k][0].dataValues.id }, transaction: t }));
            }
          }

          return Sequelize.Promise.all(updatePromises);

        });

      });
    }).then(() => {
      res.sendStatus(200);
    }).catch(function (error) {
      console.log(error);
      res.sendStatus(400);
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