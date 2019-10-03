$(document).ready(function () {

    $("#nav-orders").on("click", function (event) {
        event.preventDefault();

        location.href = "/api/orders/buyer/" + localStorage.getItem("userId");
    });

});