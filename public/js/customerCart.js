/* eslint-disable camelcase */

$(document).ready(function () {

    $(".update").on("click", function () {
        var detailID = $(this).data("cart-detail-id");
        var quantity = $(`#qty_input_${detailID}`).val();
        quantity = parseInt(quantity);

        var cartDetail = {
            quantity: quantity
        };

        $.ajax(`/api/cart/item/${detailID}`, {
            type: "PUT",
            data: cartDetail
        }).then(results => {
            console.log($(`#error_msg_${detailID}`));
            $(`#error_msg_${detailID}`).text("Updated");
        }).fail(function () {
            console.log("Error");
        });
    });

    $(".delete").on("click", function () {
        var detailID = $(this).data("cart-detail-id");

        $.ajax(`/api/cart/item/${detailID}`, {
            type: "DELETE"
        }).then(results => {
            location.reload();
        }).fail(function () {
            console.log("Error");
        });
    });

    $(".place-order").on("click", function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();

        let elements = $(".qtyInput");

        const vendorID = $(this).data("vendor-id");

        var newOrder = {
            order_user_id: localStorage.getItem("userId"),
            order_supplier_id: vendorID,
            order_item_count: elements.length,
            order_status: "Open",
            OrderDetail: []
        }


        for (let element of elements) {
            let productID = $(element).data("product-id");
            let itemID = $(element).data("cart-detail-id");
            let qtyInputID = element.id;

            let qtyElement = document.getElementById(qtyInputID);

            let quantity = qtyElement.value;

            qtyElement.required = true;

            if (!qtyElement.checkValidity()) {
                let qtyErrMsgID = "#error_msg_" + productID;
                $(qtyErrMsgID).text(qtyElement.validationMessage);
            }

            var newOrderDetail = {
                product_id: productID,
                quantity: quantity
            }

            newOrder.OrderDetail.push(newOrderDetail);
        }

        console.log(newOrder);

        var form = document.getElementById("orderForm");

        if (form.checkValidity()) {
            $.ajax({
                type: "POST",
                url: "/api/orders",
                data: JSON.stringify(newOrder),
                contentType: "application/json"
            })
                .then(data => {
                    $("#orderSubmitted").modal();
                })
                .fail(function () {
                    console.log("Error");
                });
        }
        else {
            return;
        }

    });

    $('#orderSubmitted').on('hidden.bs.modal', function (e) {
        let userID = localStorage.getItem("userId");

        $.ajax(`/api/cart/user/${userID}`, {
            type: "DELETE"
        }).then(results => {
            location.reload();
        }).fail(function () {
            console.log("Error");
        });
    })
});