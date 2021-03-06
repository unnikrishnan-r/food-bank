$(document).ready(function() {
  $("#save-changes").prop("disabled", true);
  $(".dropdown-menu a").click(function() {
    $(this)
      .parents(".dropdown")
      .find(".btn")
      .html($(this).text());
    $(this)
      .parents(".dropdown")
      .find(".btn")
      .val($(this).data("value"));
    $("#save-changes").prop("disabled", false);
    $("#save-changes").removeClass("btn-secondary");
    $("#save-changes").addClass("btn-success");

  });

  $("#save-changes").on("click", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var order = {};
    order.order_status = $(".dropdown").find(".btn").val();
    var orderId = [];
    let elements = $(".selectOrder:checked");
    for (let element of elements) {
      orderId.push($(element).attr("order-id"));
    }
    order.order_id = orderId;
    console.log(order);
    console.log(Object.keys(order));
    // Send the PUT request.
    $.ajax("/api/multipleorders", {
      type: "PUT",
      data: JSON.stringify(order),
      contentType: "application/json"

    })
      .then(
        function (updatedRowCount) {
          $.ajax("/api/notification/twilio", {
            type: "POST",
            data: JSON.stringify(order),
            contentType: "application/json"

          }).then(response => console.log(response));

          console.log(updatedRowCount + "Orders updated");
          location.reload();
        }
      );

  });

});
