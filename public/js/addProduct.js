$(document).ready(function () {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  $("#expiryDate").attr("min", today.replace(new RegExp("/", "g"), "-"));


  //if item is perishable show expiry date
  function expiryDateToggle() {
    $("#expiryDate").prop("disabled", false);
    $("input[type=radio]").click(function () {
      if ($(this).prop("value") === 1) {
        $("#expiryDate").prop("disabled", false);
      } else {
        $("#expiryDate").prop("disabled", true);
      }
    });
  }
  expiryDateToggle();

  $("#add-product-btn").on("click", function (event) {
    event.preventDefault();

    //Gets form object
    let form = $(".needs-validation")[0];

    //Prevent form from being submitted if there's a validation error
    if (form.checkValidity() === false) {
      form.classList.add("was-validated");
      return;
    }

    //default date if not perishable
    var expiryDate = $("#expiryDate").val();

    if ($("[name=perishable]:checked").val().trim() === "0") {
      expiryDate = "9999-12-31";
    }

    var newProduct = {
      product_name: $("#productName").val().trim(),
      product_description: $("#productDesc").val().trim(),
      product_img: $("#productImg").val().trim(),
      product_expiry_date: expiryDate,
      product_perishable: $("[name=perishable]:checked").val().trim(),
      product_original_qty: $("#originalQty").val().trim(),
      product_current_qty: $("#originalQty").val().trim(),
      supplier_id: localStorage.getItem("userId"),
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
          // location.reload();
          location.href = "/api/products/vendor/" + localStorage.getItem("userId");
        }
      );
  });
});