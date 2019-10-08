var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function (app) {
  // Get cart
  app.get("/api/cart/user/:id", function (req, res) {
    console.log("Get Cart");
    db.UserCartHeader.findAll({ where: { cart_owner_id: req.params.id }, include: [{ model: db.UserCartDetail, include: [{ model: db.ProductCatalog, include: [{ model: db.User, as: "Vendor" }] }] }] })
      .then(cartList => {

        var vendor;

        if (cartList.length > 0 && cartList[0].dataValues.UserCartDetails.length > 0) {
          vendor = cartList[0].dataValues.UserCartDetails[0].dataValues.ProductCatalog.dataValues.Vendor.dataValues;
        } else {
          vendor = { id: 0 };
        }

        res.render("customerCart", { layout: "buyer", cart: cartList, vendor: vendor });
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  app.get("/api/cart/user/:id/vendor", function (req, res) {
    console.log("Get Cart");
    db.UserCartHeader.findAll({ where: { cart_owner_id: req.params.id }, include: [{ model: db.UserCartDetail, include: [{ model: db.ProductCatalog, include: [{ model: db.User, as: "Vendor" }] }] }] })
      .then(cartList => {

        var vendor;

        if (cartList.length > 0 && cartList[0].dataValues.UserCartDetails.length > 0) {
          vendor = cartList[0].dataValues.UserCartDetails[0].dataValues.ProductCatalog.dataValues.Vendor.dataValues;
        } else {
          vendor = { id: 0 };
        }

        res.json(vendor);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  app.get("/api/cart/user/:id/count", function (req, res) {
    console.log("Get Cart Item Count");
    db.UserCartHeader.count({
      where: { cart_owner_id: req.params.id }, include: [db.UserCartDetail]
    })
      .then(cartCount => {
        res.json({ count: cartCount });
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
            db.UserCartDetail.findOrCreate({ where: { [Op.and]: [{ cart_id: createdCart[0].id }, { product_id: cartDetails[i].product_id }] }, defaults: { cart_id: createdCart[0].id, product_id: cartDetails[i].product_id, quantity: cartDetails[i].quantity }, transaction: t })
          );
        }

        //Update order cart detail if it already exists
        return Sequelize.Promise.all(orderPromises).then(order => {
          var updatePromises = [];

          for (let k = 0; k < order.length; k++) {

            if (!order[k][0]._options.isNewRecord) {
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
  app.put("/api/cart/item/:id", function (req, res) {
    console.log("Updates a cart item quantity");
    db.UserCartDetail.update({ quantity: req.body.quantity }, { where: { id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " updated");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Delete a cart item
  app.delete("/api/cart/item/:id", function (req, res) {
    console.log("Delete a cart");
    db.UserCartDetail.findOne({ where: { id: req.params.id } })
      .then(cartItem => {

        return db.UserCartHeader.count({
          where: { id: cartItem.cart_id }, include: [db.UserCartDetail]
        })
          .then(cartCount => {

            //More than one item in the cart, delete cart item
            if (cartCount > 1) {
              return db.UserCartDetail.destroy({ where: { id: req.params.id } })
                .then(affectedCount => {
                  res.status(200).send(affectedCount + " deleted");
                }).catch(function (error) {
                  console.log(error);
                  res.sendStatus(500);
                });
            } else {
              //if last item is being deleted, delete the cart header
              return db.UserCartHeader.destroy({ where: { id: cartItem.cart_id } })
                .then(affectedCount => {
                  res.status(200).send(affectedCount + " deleted");
                }).catch(function (error) {
                  console.log(error);
                  res.sendStatus(500);
                });
            }

          }).catch(function (error) {
            console.log(error);
            res.sendStatus(500);
          });

      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });

  });

  // Delete a cart using id
  app.delete("/api/cart/user/:id", function (req, res) {
    console.log("Delete a cart");
    db.UserCartHeader.destroy({ where: { cart_owner_id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " deleted");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });


};