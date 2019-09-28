/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserRole', {
		user_role_name: {
			type: DataTypes.STRING(45),
			allowNull: false
		}
	}, {
		tableName: 'UserRole'
	});
};
