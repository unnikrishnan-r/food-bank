module.exports = function (sequelizeConnection, DataTypes) {
  const UserRole = sequelizeConnection.define("UserRole", {
    user_role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  UserRole.associate = function(db){
    db.UserRole.hasMany(db.User);
  };

  return UserRole;
};