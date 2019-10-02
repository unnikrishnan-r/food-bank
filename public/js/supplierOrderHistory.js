$(document).ready(function() {
  $(".dropdown-menu a").click(function() {
    $(this)
      .parents(".dropdown")
      .find(".btn")
      .html($(this).text());
    $(this)
      .parents(".dropdown")
      .find(".btn")
      .val($(this).data("value"));
  });

  $("#save-changes").on("click", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var orderData = [];
    let elements = $(".selectOrder:checked");
    for (let element of elements) {
      var order = {};
      order.orderStatus = $(".dropdown").find('.btn').val();
      order.orderId = $(element).attr("order-id");
      orderData.push(order)
    }
    console.log(orderData);
  });

});
