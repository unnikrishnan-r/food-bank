// `id` int(11) NOT NULL AUTO_INCREMENT,
//   `product_name` varchar(45) NOT NULL,
//   `product_description` varchar(200) DEFAULT NULL,
//   `product_expiry_date` date NOT NULL DEFAULT '9999-12-31',
//   `product_perishable` tinyint(4) NOT NULL,
//   `product_original_qty` int(11) NOT NULL,
//   `product_current_qty` int(11) NOT NULL DEFAULT '0',
//   `supplier_id` int(11) NOT NULL,
//   `product_posted_date` date NOT NULL,
//   PRIMARY KEY (`id`),
//   KEY `supplier_id_idx` (`supplier_id`),
//   CONSTRAINT `supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `User` (`id`)



$(document).ready(function () {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  $("#add-product-btn").on("click", function (event) {
    event.preventDefault();

    var newProduct = {
      // eslint-disable-next-line camelcase
      product_name: $("#productName").val().trim(),
      // eslint-disable-next-line camelcase
      product_description: $("#productDesc").val().trim(),
      // eslint-disable-next-line camelcase
      product_expiry_date: $("#expiryDate").val(),
      // eslint-disable-next-line camelcase
      product_perishable: $("[name=perishable]:checked").val().trim(),
      // eslint-disable-next-line camelcase
      product_original_qty: $("#originalQty").val().trim(),
      // eslint-disable-next-line camelcase
      product_current_qty: $("#originalQty").val().trim(),
      // eslint-disable-next-line camelcase
      supplier_id: 1,
      // eslint-disable-next-line camelcase
      product_posted_date: today
    };

    // Send the PUT request.
    $.ajax("/api/products", {
      type: "POST",
      data: newProduct
    })
      .then(
        function () {
          console.log("New Product Added" + newProduct);
        }
      );
  });
});