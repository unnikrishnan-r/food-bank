var db = require("../models");

module.exports = function(app) {
  app.post("/api/login", function(req, res) {
    console.log("Validating login");
    db.User.findOne({
      where: {
        user_name: req.body.user_name,
        user_password: req.body.user_password
      },
      include: [{ model: db.UserRole }]
    })
      .then(userData => {
        if (userData) {
          res.json({
            userId: userData.dataValues.id,
            userRole: userData.dataValues.UserRole.user_role_name
          });
        } else {
          res.json(null);
        }
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(400);
      });
  });
};
