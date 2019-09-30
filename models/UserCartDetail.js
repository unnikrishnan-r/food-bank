/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("UserCartDetail", {
    cart_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "UserCartHeader",
        key: "id"
      }
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: "UserCartDetail"
  });
};
