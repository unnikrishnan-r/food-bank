/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		user_name: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		user_password: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		user_role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'UserRole',
				key: 'id'
			}
		},
		user_email_id: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		user_addr_1: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		user_addr_2: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		user_addr_city: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		user_addr_province: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		user_addr_postal_code: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		user_phone_no: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'User'
	});
};
