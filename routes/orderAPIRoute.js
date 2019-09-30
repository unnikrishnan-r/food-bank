/* eslint-disable camelcase */
var db = require("../models");
var Sequelize = require("sequelize");

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
  app.get("/api/orders/:id", function (req, res) {
    console.log("Get an order and order details");
    db.OrderHeader.findAll({ where: { id: req.params.id }, include: [{ model: db.OrderDetail, include: [db.ProductCatalog] }, { model: db.User, as: "Buyer" }, { model: db.User, as: "Vendor" }] })
      .then(orderList => {
        res.json(orderList);
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
        res.render("customerOrderHistory", { order: orderList })
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
        where: { order_supplier_id: req.params.id, order_status: "Open" }
        , include: [{
          model: db.User, as: "Buyer",
          where: { id: Sequelize.col('OrderHeader.order_user_id') }
        }]
      })
      .then(orderList => {
        res.render("supplierOrderHistory", { order: orderList })
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
  app.post("/api/orders", function (req, res) {
    console.log("Create an order");
    db.OrderHeader.create(req.body, { include: [db.OrderDetail] })
      .then(createdOrder => {
        res.status(200).send(createdOrder);
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
};