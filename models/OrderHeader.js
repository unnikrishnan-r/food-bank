/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	var OrderHeader = sequelize.define('OrderHeader', {
		order_user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		},
		order_supplier_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
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
		tableName: 'OrderHeader'
	});

	OrderHeader.associate = function (models) {
		console.log(models);
		models.OrderHeader.belongsTo(models.User, { foreignKey: { allowNull: false } });
	}

	return OrderHeader;
};

