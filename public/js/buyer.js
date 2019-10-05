$(document).ready(function () {

  var userID = localStorage.getItem("userId");

  $("#nav-orders").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/orders/buyer/" + userID;
  });

  $("#nav-cart").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/cart/user/" + userID;
  });

  $("#nav-user").text("Welcome " + localStorage.getItem("userName"));

  $("#nav_logout").on("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    location.href = "/";
  });

  $.ajax(`/api/cart/user/${userID}/count`)
    .then(function (cart) {
      $("#nav-cart").text(`Cart (${cart.count})`);
    });


});