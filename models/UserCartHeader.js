/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  var UserCartHeader = sequelize.define("UserCartHeader", {
    cart_owner_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      },
      unique: true
    },
    cart_status: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: "UserCartHeader"
  });

  UserCartHeader.associate = function (models) {
    models.UserCartHeader.belongsTo(models.User, { as: "Buyer", foreignKey: { name: "cart_owner_id", allowNull: false } });
    models.UserCartHeader.hasMany(models.UserCartDetail, { foreignKey: { name: "cart_id", allowNull: false } });
  };

  return UserCartHeader;

};
