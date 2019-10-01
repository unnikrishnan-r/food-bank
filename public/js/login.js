$(document).ready(function() {
  $("#login-btn").on("click", function(event) {
    event.preventDefault();
    var user = {
      // eslint-disable-next-line camelcase
      user_name: $("#username")
        .val()
        .trim(),
      // eslint-disable-next-line camelcase
      user_password: $("#password")
        .val()
        .trim()
    };

    // Send the PUT request.
    $.ajax("/api/login", {
      type: "post",
      data: user
    }).then(function(user) {
      if (user) {
        console.log("logged in as ", user.userRole, user.userId);
        switch (user.userRole) {
        case "Vendor":
          location.href = `/api/products/vendor/${user.userId}`;
          break;
        case "Buyer":
          location.href = `/api/products/buyer/${user.userId}`;
          break;

        default:
          console.log("Default");
          break;
        }
      } else {
        console.log("Log in failed");
      }
    });
  });
});
