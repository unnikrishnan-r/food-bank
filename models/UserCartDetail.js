/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserCartDetail', {
		cart_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'UserCartHeader',
				key: 'id'
			}
		},
		product_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'UserCartDetail'
	});
};
