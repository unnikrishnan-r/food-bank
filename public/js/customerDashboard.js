/* eslint-disable camelcase */

$(document).ready(function () {
  $(".place-order").on("click", function () {
    var newOrder = {
      order_user_id: 1,
      order_supplier_id: 20,
      order_item_count: 3,
      order_status: "Open",
      OrderDetail: [{
        product_id: 25,
        quantity: 1
      },
      {
        product_id: 56,
        quantity: 10
      }]
    };
  });

});