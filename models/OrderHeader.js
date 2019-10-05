/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  var OrderHeader = sequelize.define("OrderHeader", {
    order_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    order_supplier_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      }
    },
    order_item_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    order_status: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: "OrderHeader"
  });

  OrderHeader.associate = function (models) {
    models.OrderHeader.belongsTo(models.User, { as: "Buyer", foreignKey: { name: "order_user_id", allowNull: false } });
    models.OrderHeader.belongsTo(models.User, { as: "Vendor", foreignKey: { name: "order_supplier_id", allowNull: false } });
    models.OrderHeader.hasMany(models.OrderDetail, { foreignKey: { name: "order_id", allowNull: false } });
  };

  return OrderHeader;
};

