/* eslint-disable camelcase */

$(document).ready(function () {

  $(".place-order").on("click", function () {
    var newCart = {
      cart_owner_id: 1,
      cart_status: "Open",
      product_id: $(this).data("product-id"),
      quantity: 1
    };

    $.post("/api/cart/user", newCart)
      .then(results => {
        console.log(results);
      });
  });

});