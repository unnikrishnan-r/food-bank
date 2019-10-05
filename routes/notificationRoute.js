var twilio = require("twilio")(
  process.env.TWILIO_ACCOUNTSID,
  process.env.TWILIO_AUTHTOKEN
);

module.exports = function(app) {
  app.post("/api/notification/twilio", function(req, res) {
    req.body.order_id.forEach(orderRecord => {
      console.log(
        `Text notification for ${orderRecord} , status changed to ${req.body.order_status}`
      );
      twilio.messages
        .create({
          body: `Dear Customer, Status of your order ${orderRecord} has been updated to ${req.body.order_status}`,
          from: "+18706690840",
          to: "+12106161664" //To be changed to actual phone number of user
        })
        .then(message => {
          console.log(message.sid);
        });
    });
    res.sendStatus(200);
  });
};
