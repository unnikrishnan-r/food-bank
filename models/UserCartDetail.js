/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  var UserCartDetail = sequelize.define("UserCartDetail", {
    cart_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
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

  UserCartDetail.associate = function (models) {
    models.UserCartDetail.belongsTo(models.UserCartHeader, { onDelete: "CASCADE", foreignKey: { name: "cart_id", allowNull: false } });
    models.UserCartDetail.belongsTo(models.ProductCatalog, { foreignKey: { name: "product_id", allowNull: false } });
  };

  return UserCartDetail;

};
