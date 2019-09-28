/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ProductCatalog', {
		product_name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		product_description: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		product_expiry_date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: '9999-12-31'
		},
		product_perishable: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 0
		},
		product_original_qty: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		product_current_qty: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		supplier_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		},
		product_posted_date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	}, {
		tableName: 'ProductCatalog'
	});
};
