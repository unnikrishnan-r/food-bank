/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('OrderDetail', {
		order_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'OrderHeader',
				key: 'id'
			}
		},
		product_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'OrderDetail'
	});
};
