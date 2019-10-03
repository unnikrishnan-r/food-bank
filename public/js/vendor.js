$(document).ready(function () {

  $("#nav-my-products").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/products/vendor/" + localStorage.getItem("userId");
  });

  $("#nav-orders").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/orders/vendor/" + localStorage.getItem("userId");
  });

});