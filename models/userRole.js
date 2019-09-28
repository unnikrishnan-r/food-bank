/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	var UserRole = sequelize.define('UserRole', {
		user_role_name: {
			type: DataTypes.STRING(45),
			allowNull: false
		}
	}, {
		tableName: 'UserRole'
	});

	UserRole.associate = function (models) {
		models.UserRole.hasMany(models.User, { foreignKey: { name: 'user_role_id', allowNull: false } });
	}

	return UserRole;
};
