module.exports = function (sequelizeConnection, DataTypes) {
    const User = sequelizeConnection.define("User", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_email_id: {
        type: DataTypes.STRING
      },
      user_addr_1: {
        type: DataTypes.STRING
      },
      user_addr_2: {
        type: DataTypes.STRING
      },
      user_addr_city: {
        type: DataTypes.STRING
      },
      user_addr_province: {
        type: DataTypes.STRING
      },
      user_addr_postal_code: {
        type: DataTypes.STRING
      },      
      user_phone_no: {
        type: DataTypes.INTEGER
      }
    });
    return User;
  };