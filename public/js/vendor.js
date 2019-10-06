$(document).ready(function () {

  $("#nav-my-products").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/products/vendor/" + localStorage.getItem("userId");
  });

  $("#nav-orders").on("click", function (event) {
    event.preventDefault();

    location.href = "/api/orders/vendor/" + localStorage.getItem("userId");
  });

  $("#nav-user").text("Welcome " + localStorage.getItem("userName"));

  $("#nav_logout").on("click", function (event) {
    event.preventDefault();

    localStorage.clear();
    location.href = "/";
  });

  $(".delete-product").on("click", function(event){
    event.preventDefault();
    console.log(`Trying to delete product ${$(this).attr("product-id")}`);
    $.ajax(`/api/countProductsInOrder/${$(this).attr("product-id")}`)
    .then(function (response) {
      console.log(`Product is present in ${response.openOrderCount} unfulfilled orders`)
    });

  });
});