var db = require("../models");

module.exports = function (app) {

  // Get all orders
  app.get("/api/orders", function (req, res) {
    console.log("Get All Orders");
    db.OrderHeader.findAll({ include: [User] })
      .then(function (orderList) {
        res.json(orderList);
      }).catch(function (error) {
        res.sendStatus(500);
      });
  });

  // Get an order with it's order details and user info
  app.get("/api/orders/:id", function (req, res) {
    console.log("Get an order and order details");
    db.OrderHeader.findAll({ where: { id: req.params.id }, include: [OrderDetail, User] })
      .then(function (orderList) {
        res.json(orderList);
      }).catch(function (error) {
        res.sendStatus(500);
      });
  });

  // Get user's order
  app.get("/api/orders/user/:id", function (req, res) {
    console.log("Get an order and order details");
    db.OrderHeader
      .findAll({ include: [{ model: User, where: { id: req.params.id } }] })
      .then(function (orderList) {
        res.json(orderList);
      }).catch(function (error) {
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
    db.OrderHeader.create(req.body, { include: [OrderDetail] })
      .then(function (createdOrder) {
        res.sendStatus(200);
      }).catch(function (error) {
        res.sendStatus(400);
      });;
  });

  // Delete an order using id
  app.delete("/api/orders/:id", function (req, res) {
    console.log("Delete an order");
    db.OrderHeader.destroy({ where: { id: req.params.id } })
      .then(function (affectedCount) {
        res.sendStatus(200);
      }).catch(function (error) {
        res.sendStatus(500);
      });;
  });

  // Updates an order status
  app.put("/api/orders", function (req, res) {
    console.log("Updates an order status");
    db.OrderHeader.update({ order_status: req.body.order_status }, { where: { id: req.params.id } })
      .then(function (affectedCount) {
        res.sendStatus(200);
      }).catch(function (error) {
        res.sendStatus(500);
      });;
  });
};
