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
            $.ajax(`/api/products/vendor/${user.userId}`, {
              type: "GET"
          }).then(data => console.log(data));
          break;
        case "Buyer":
          $.ajax(`/api/products/buyer/${user.userId}`, {
            type: "GET"
          });
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
