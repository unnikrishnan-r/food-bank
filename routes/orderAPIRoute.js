/* eslint-disable camelcase */
var db = require("../models");
var Sequelize = require("sequelize");
var moment = require("moment");
// var helpers = require('handlebars-helpers')();

module.exports = function (app) {
  // Get all orders
  app.get("/api/orders", function (req, res) {
    console.log("Get All Orders");
    db.OrderHeader.findAll({ include: [{ model: db.User, as: "Buyer" }, { model: db.User, as: "Vendor" }] })
      .then(orderList => {
        res.json(orderList);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Get an order with it's order details and user info
  app.get("/api/buyer/orders/:id", function (req, res) {
    console.log("Get an order and order details");
    db.OrderHeader.findAll({ where: { id: req.params.id }, include: [{ model: db.OrderDetail, include: [db.ProductCatalog] }, { model: db.User, as: "Buyer" }, { model: db.User, as: "Vendor" }] })
      .then(orderDetail => {
        orderDetail = orderDetail.map(order => {
          const orderObj = order.toJSON();
          orderObj.createdAt = moment(orderObj.createdAt).format("MM/DD/YYYY");
          orderObj.OrderDetails.forEach(orderedProduct => {
            orderedProduct.ProductCatalog.product_expiry_date = moment(orderedProduct.ProductCatalog.product_expiry_date).format("MM/DD/YYYY")
          });
          return orderObj;
        });

        res.render("orderDetail", { layout: "buyer", order: orderDetail })
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Get an order with it's order details and user info
  app.get("/api/vendor/orders/:id", function (req, res) {
    console.log("Get an order and order details");
    db.OrderHeader.findAll({ where: { id: req.params.id }, include: [{ model: db.OrderDetail, include: [db.ProductCatalog] }, { model: db.User, as: "Buyer" }, { model: db.User, as: "Vendor" }] })
      .then(orderDetail => {
        orderDetail = orderDetail.map(order => {
          const orderObj = order.toJSON();
          orderObj.createdAt = moment(orderObj.createdAt).format("MM/DD/YYYY");
          orderObj.OrderDetails.forEach(orderedProduct => {
            orderedProduct.ProductCatalog.product_expiry_date = moment(orderedProduct.ProductCatalog.product_expiry_date).format("MM/DD/YYYY")
          });
          return orderObj;
        });

        res.render("orderDetail", { layout: "vendor", order: orderDetail })

      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Get buyer's order - Input is buyer's Id. 
  //Output is Order Header details + Vendor details
  app.get("/api/orders/buyer/:id", function (req, res) {
    console.log("Get All orders for a customer");
    db.OrderHeader
      .findAll({
        where: { order_user_id: req.params.id }
        , include: [{
          model: db.User, as: "Vendor",
          where: { id: Sequelize.col('OrderHeader.order_supplier_id') }
        }]
      })
      .then(orderList => {
        orderList = orderList.map(order => {
          const orderObj = order.toJSON();
          orderObj.createdAt = moment(orderObj.createdAt).format("MM/DD/YYYY");
          return orderObj;
        })
        res.render("customerOrderHistory", { layout: "buyer", order: orderList });
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Get vendor's order - Input is Vendor's Id
  //Output is Order Header details + Buyer details
  app.get("/api/orders/vendor/:id", function (req, res) {
    console.log("Get All orders for a Vendor");
    db.OrderHeader
      .findAll({
        where: {
          order_supplier_id: req.params.id
          // , order_status: "Open" 
        }
        , include: [{
          model: db.User, as: "Buyer",
          where: { id: Sequelize.col('OrderHeader.order_user_id') }
        }]
      })
      .then(orderList => {
        orderList = orderList.map(order => {
          const orderObj = order.toJSON();
          orderObj.createdAt = moment(orderObj.createdAt).format("MM/DD/YYYY");
          return orderObj;
        })
        res.render("supplierOrderHistory", { layout: "vendor", order: orderList });
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  /* Create a new Order
    {
        "order_user_id": 1,
        "order_supplier_id": 20,
        "order_item_count": 3,
        "order_status": "Open",
        "OrderDetail": [{
          "product_id": 25,
          "quantity": 1
        },
        {
          "product_id": 56,
          "quantity": 10
        }]
      }

  */
  app.post("/api/orders", async function (req, res) {
    console.log("Create an order");

    var orderDetails = req.body.OrderDetail;
    var orderHeader;

    db.sequelizeConnection.transaction(t => {

      //Create an Order Header
      return db.OrderHeader.create(req.body, { transaction: t })
        .then(createdOrder => {
          orderHeader = createdOrder;
          var orderPromises = [];

          //Create multiple order details
          for (let i = 0; i < orderDetails.length; i++) {
            orderPromises.push(
              db.OrderDetail.create({ order_id: createdOrder.id, product_id: orderDetails[i].product_id, quantity: orderDetails[i].quantity }, { transaction: t })
            );
          }

          //Find multiple products to update inventory count
          return Sequelize.Promise.all(orderPromises).then(newOrderDetails => {
            var productPromises = [];

            for (let j = 0; j < newOrderDetails.length; j++) {
              productPromises.push(db.ProductCatalog.findOne({ where: { id: newOrderDetails[j].product_id }, transaction: t }));
            }

            //Update product inventory count
            return Sequelize.Promise.all(productPromises).then(products => {
              var updatePromises = [];

              for (let k = 0; k < products.length; k++) {

                let currentQty = products[k].product_current_qty;
                let newQty = currentQty - orderDetails[k].quantity;

                updatePromises.push(db.ProductCatalog.update({ product_current_qty: newQty }, { where: { id: products[k].id }, transaction: t }));
              }

              return Sequelize.Promise.all(updatePromises);

            });

          });

        });
    }).then(() => {
      res.json(orderHeader);
    }).catch(function (error) {
      console.log(error);
      res.sendStatus(400);
    });

  });

  // Delete an order using id
  app.delete("/api/orders/:id", function (req, res) {
    console.log("Delete an order");
    db.OrderHeader.destroy({ where: { id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " deleted");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Updates an order status
  app.put("/api/orders/:id", function (req, res) {
    console.log("Updates an order status");
    db.OrderHeader.update({ order_status: req.body.order_status }, { where: { id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " updated");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });


  // Updates an order status
  app.put("/api/multipleorders", function (req, res) {
    console.log("Updates multiple orders");
    db.OrderHeader.update({ order_status: req.body.order_status }, { where: { id: req.body.order_id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Get an Unique Order
  app.get("/api/uniqueorder/:id", function (req, res) {
    console.log("Get an Unique");

    db.OrderHeader.findAll({
      where: { id: req.params.id },
      include: [
        { model: db.OrderDetail, include: [db.ProductCatalog] },
        { model: db.User, as: "Buyer" },
        { model: db.User, as: "Vendor" }
      ]
    })
      .then(orderDetail => {
        orderDetail = orderDetail.map(order => {
          const orderObj = order.toJSON();
          orderObj.createdAt = moment(orderObj.createdAt).format("MM/DD/YYYY");
          orderObj.OrderDetails.forEach(orderedProduct => {
            orderedProduct.ProductCatalog.product_expiry_date = moment(
              orderedProduct.ProductCatalog.product_expiry_date
            ).format("MM/DD/YYYY");
          });
          res.json(orderObj);
        });
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

};