$(document).ready(function () {
  $("#order-btn").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/orders/vendor/" + localStorage.getItem("userId");
  });

});