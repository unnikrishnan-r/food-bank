/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: "UserRole",
        key: "id"
      }
    },
    user_email_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_addr_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_addr_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_addr_city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_addr_province: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_addr_postal_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_phone_no: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: "User"
  });

  User.associate = function (models) {
    models.User.belongsTo(models.UserRole, { foreignKey: { name: "user_role_id", allowNull: false } });
    models.User.hasMany(models.ProductCatalog, { foreignKey: { name: "supplier_id", allowNull: false } });
  };

  return User;
};
