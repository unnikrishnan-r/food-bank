/* eslint-disable camelcase */
var db = require("../models");

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

  // Get buyer's order
  app.get("/api/orders/buyer/:id", function (req, res) {
    console.log("Get an order");
    db.OrderHeader
      .findAll({ include: [{ model: db.User, as: "Buyer", where: { id: req.params.id } }] })
      .then(orderList => {
        res.json(orderList);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // Get vendor's order
  app.get("/api/orders/vendor/:id", function (req, res) {
    console.log("Get an order");
    db.OrderHeader
      .findAll({ include: [{ model: db.User, as: "Vendor", where: { id: req.params.id } }] })
      .then(orderList => {
        res.json(orderList);
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
  app.put("/api/orders", function (req, res) {
    console.log("Updates an order status");
    db.OrderHeader.update({ order_status: req.body.order_status }, { where: { id: req.params.id } })
      .then(affectedCount => {
        res.status(200).send(affectedCount + " deleted");
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  });
};