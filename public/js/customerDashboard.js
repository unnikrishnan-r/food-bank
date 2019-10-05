/* eslint-disable camelcase */

$(document).ready(function () {


  $("#place-order").on("click", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    $("#message").empty();

    let elements = $(".selectOrder:checked");

    if (elements.length === 0) {
      $("#message").text("Select at least one product.");
      return;
    }

    const vendorID = $(this).data("vendor-id");

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
          console.log($("#orderSubmitted"));
          $("#orderSubmitted").modal();

        })
        .fail(function () {
          console.log("Error");
        });
    }
    else {
      return;
    }

  });

  $('#orderSubmitted').on('hidden.bs.modal', function (e) {
    location.reload();
  })

});