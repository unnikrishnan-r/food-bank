$(document).ready(function () {
    $("#login-btn").on("click", function (event) {
        event.preventDefault();

        let user = {
            user_name: $("#username").val().trim(),
            user_password: $("#password").val().trim()
        }

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