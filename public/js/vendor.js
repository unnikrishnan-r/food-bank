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

  $(".delete-product").on("click", function(event) {
    event.preventDefault();
    console.log(`Trying to delete product ${$(this).attr("product-id")}`);
    var productIdToBeDeleted = $(this).attr("product-id");
    $.ajax(`/api/countProductsInOrder/${productIdToBeDeleted}`).then(function(
      response
    ) {
      console.log(
        `Product is present in ${response.openOrderCount} unfulfilled orders`
      );
      if (response.openOrderCount > 0) {
        $("#modal-title-message").text("Unable to Delete");
        $("#productDeleteMessage").text(
          "Cannot delete the product, there are open orders for it. Sorry!"
        );
        $("#unableToDelete").modal();
        console.log("ffff");
      } else {
        $.ajax(`/api/products/${productIdToBeDeleted}`, {
          type: "DELETE"
        })
          .then(results => {
            location.reload();
          })
          .fail(function() {
            console.log("Error");
          });
      }
    });
  });
});