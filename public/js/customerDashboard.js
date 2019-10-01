/* eslint-disable camelcase */

$(document).ready(function () {

  $("#place-order").on("click", function () {
    let elements = $(".selectOrder:checked");

    var newOrder = {
      order_user_id: 1,
      order_supplier_id: $(this).data("vendor-id"),
      order_item_count: elements.length,
      order_status: "Open",
      OrderDetail: []
    }

    for (let element of elements) {
      let productID = $(element).data("product-id");
      let qtyInputID = "#qty_input_" + productID;
      let quantity = $(qtyInputID).val();

      var newOrderDetail = {
        "product_id": productID,
        "quantity": quantity
      }

      newOrder.OrderDetail.push(newOrderDetail);
    }

    $.post("/api/orders", newOrder)
      .then(data => {
        console.log(data);
      })
      .fail(function () {
        console.log("Error");
      })
  });

});