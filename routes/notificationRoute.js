var twilio = require("twilio")(
  process.env.TWILIO_ACCOUNTSID,
  process.env.TWILIO_AUTHTOKEN
);

const axios = require("axios");

var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || "http://localhost";

module.exports = function(app) {
  app.post("/api/notification/twilio", function(req, res) {
    req.body.order_id.forEach(orderRecord => {
      console.log(
        `Text notification for ${orderRecord} , status changed to ${req.body.order_status}`
      );
      axios
        .get(`${HOST}:${PORT}/api/uniqueorder/${orderRecord}`)
        .then(function(response) {
          twilio.messages
            .create({
              body: `Dear Customer, Status of your order ${orderRecord} has been updated to ${req.body.order_status}`,
              from: "+18706690840",
              to: `+1${response.data.Buyer.user_phone_no}` //To be changed to actual phone number of user
            })
            .then(message => {
              console.log(message.sid);
            });
        })
        .catch(function(error) {
          console.log("Errors " + error.message);
        });
    });
    res.sendStatus(200);
  });
};
