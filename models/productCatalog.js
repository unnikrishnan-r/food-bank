module.exports = function (sequelizeConnection, DataTypes) {
    const ProductCatalog = sequelizeConnection.define("ProductCatalog", {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_description: {
        type: DataTypes.STRING
      }
    });

  
    return ProductCatalog;
  };