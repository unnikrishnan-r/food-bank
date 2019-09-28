$(document).ready(function () {
  $("#login-btn").on("click", function (event) {
    event.preventDefault();

    var user = {
      // eslint-disable-next-line camelcase
      user_name: $("#username").val().trim(),
      // eslint-disable-next-line camelcase
      user_password: $("#password").val().trim()
    };

    // Send the PUT request.
    $.ajax("", {
      type: "get",
      data: user
    })
      .then(
        function () {
          console.log("logged in");

        }
      );
  });
});