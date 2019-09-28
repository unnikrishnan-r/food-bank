/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	var OrderDetail = sequelize.define('OrderDetail', {
		order_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
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

	OrderDetail.associate = function (models) {
		models.OrderDetail.belongsTo(models.OrderHeader, { foreignKey: { name: 'order_id', allowNull: false } });
		//models.OrderDetail.hasOne(models.ProductCatalog, { foreignKey: { name: 'id', allowNull: false } });
	}

	return OrderDetail;
};
