$(document).ready(function () {
  $("#login-btn").on("click", function (event) {
    localStorage.clear();
    console.log("Local storage cleared");
    event.preventDefault();
    var user = {
      user_name: $("#username")
        .val()
        .trim(),
      user_password: $("#password")
        .val()
        .trim()
    };

    if (!user.user_name || !user.user_password) {
      console.log("Log in failed");
      $("#buttonEmptyAlert").addClass("show");
      return;
    }

    // Send the PUT request.
    $.ajax("/api/login", {
      type: "post",
      data: user
    }).then(function (user) {
      if (user) {
        console.log("logged in as ", user.userRole, user.userId);
        localStorage.setItem("userId", user.userId);
        localStorage.setItem("userRole", user.userRole);
        localStorage.setItem("userName", user.userName);


        switch (user.userRole) {
          case "Vendor":
            location.href = `/api/products/vendor/${user.userId}`;
            break;
          case "Buyer":
            location.href = "/api/users/Vendor";
            break;

          default:
            console.log("Default");
            break;
        }
      } else {
        console.log("Log in failed");
        $("#buttonAlert").addClass("show");
      }
    });
  });
});
