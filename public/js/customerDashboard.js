/* eslint-disable camelcase */

$(document).ready(function () {

  $(".place-order").on("click", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    $("#message").empty();

    let elements = $(".selectOrder:checked");

    if (elements.length === 0) {
      $("#message").text("Select at least one product.");
      return;
    }

    let vendorID = $(this).data("vendor-id");
    let userID = localStorage.getItem("userId");

    $.ajax(`/api/cart/user/${userID}/vendor`)
      .then(vendor => {
        console.log(vendor);

        //Cart is empty or the cart items are for the same vendor
        if (vendor.id === 0 || vendorID === vendor.id) {
          var newCart = {
            cart_owner_id: localStorage.getItem("userId"),
            cart_status: "Open",
            UserCartDetail: []
          }

          for (let element of elements) {
            let productID = $(element).data("product-id");
            let qtyInputID = "#qty_input_" + productID;
            let qtyElement = document.getElementById("qty_input_" + productID);
            let quantity = qtyElement.value;

            qtyElement.required = true;

            if (!qtyElement.checkValidity()) {
              let qtyErrMsgID = "#error_msg_" + productID;
              $(qtyErrMsgID).text(qtyElement.validationMessage);
            }

            var newCartDetail = {
              product_id: productID,
              quantity: quantity
            }

            newCart.UserCartDetail.push(newCartDetail);
          }

          var form = document.getElementById("orderForm");

          if (form.checkValidity()) {

            $.ajax({
              type: "POST",
              url: "/api/cart/user",
              data: JSON.stringify(newCart),
              contentType: "application/json"
            })
              .then(data => {
                $("#orderSubmitted").modal();

              })
              .fail(function () {
                console.log("Error");
              });
          }
          else {
            return;
          }
        }
        else if (vendor.id > 0) {
          $("#vendorName").text(vendor.user_name);
          $("#cartHasItems").modal();
        }

      }).fail(function () {
        console.log("Error");
      });

  });

  $('#orderSubmitted').on('hidden.bs.modal', function (e) {
    location.reload();
  });

  $("#deleteCart").on("click", function (event) {
    let userID = localStorage.getItem("userId");

    $.ajax(`/api/cart/user/${userID}`, {
      type: "DELETE"
    }).then(results => {
      $("#vendorName").text();
      $("#nav-cart").text("Cart (0)");
      $('#cartHasItems').modal('hide');
    }).fail(function () {
      console.log("Error");
    });
  });

});