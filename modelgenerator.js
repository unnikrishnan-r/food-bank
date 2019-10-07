var SequelizeAuto = require("sequelize-auto");
// var auto = new SequelizeAuto('database', 'user', 'pass');


// With options:
var auto = new SequelizeAuto("foodbank_db", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306
});

auto.run(function (err) {
  if (err) {
    throw err;
  }
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
