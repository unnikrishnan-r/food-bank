$(document).ready(function () {

  $("#nav-orders").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/orders/buyer/" + localStorage.getItem("userId");
  });

  $("#nav-cart").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/cart/user/" + localStorage.getItem("userId");
  });

  $("#nav-user").text("Welcome " + localStorage.getItem("userName"));

  $("#nav_logout").on("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    location.href = "/";
  });


});