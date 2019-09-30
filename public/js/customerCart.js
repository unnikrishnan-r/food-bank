/* eslint-disable camelcase */

$(document).ready(function () {

    $(".update").on("click", function () {
        var detailID = $(this).data("cart-detail-id");

        var quantity = {
            id: detailID
            , quantity: $(`#row-${detailID} #qty_input`).val()
        };

        $.post(`/api/cart/user`, {
            type: "PUT",
            data: quantity
        }).then(results => {
            console.log(results);
        });
    });

});