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

    $("#place-order").on("click", function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();

        $("#message").empty();

        let elements = $(".selectOrder:checked");

        if (elements.length === 0) {
            $("#message").text("Select at least one product.");
            return;
        }

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
            let qtyInputID = "#qty_input_" + productID;
            let qtyElement = document.getElementById("qty_input_" + productID);
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

        var form = document.getElementById("orderForm");

        if (form.checkValidity()) {
            $.ajax({
                type: "POST",
                url: "/api/orders",
                data: JSON.stringify(newOrder),
                contentType: "application/json"
            })
                .then(data => {
                    console.log($("#orderSubmitted"));
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
        location.reload();
    })
});