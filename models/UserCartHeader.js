/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserCartHeader', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		cart_owner_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			},
			unique: true
		},
		cart_status: {
			type: DataTypes.STRING(20),
			allowNull: false
		}
	}, {
		tableName: 'UserCartHeader'
	});
};
