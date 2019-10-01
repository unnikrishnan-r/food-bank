/* eslint-disable camelcase */

$(document).ready(function () {


  $("#place-order").on("click", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    let elements = $(".selectOrder:checked");

    const vendorID = $(this).data("vendor-id");

    var newOrder = {
      order_user_id: 1,
      order_supplier_id: vendorID,
      order_item_count: elements.length,
      order_status: "Open",
      OrderDetail: []
    }

    var orderDetails = [];

    for (let element of elements) {
      let productID = $(element).data("product-id");
      let qtyInputID = "#qty_input_" + productID;
      let quantity = $(qtyInputID).val();

      if (quantity < 1) {
        return;
      }

      var newOrderDetail = {
        product_id: productID,
        quantity: quantity
      }

      newOrder.OrderDetail.push(newOrderDetail);
    }

    $.ajax({
      type: "POST",
      url: "/api/orders",
      data: JSON.stringify(newOrder),
      contentType: "application/json"
    })
      .then(data => {
        console.log(data);
      })
      .fail(function () {
        console.log("Error");
      });
  });

});