const { Model, DataTypes } = require('sequelize')
const CategorisEnum = require('../config/categories')

class Product extends Model {
    static init(connection) {
        super.init({
            id_brand: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.FLOAT,
            description: DataTypes.TEXT,
            image_uri: DataTypes.STRING,
            category: DataTypes.ENUM(Object.values(CategorisEnum)),
            created_at: DataTypes.DATE
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.belongsTo(models.Brand, { foreignKey: 'id_brand', as: 'brand' })
    }
}

module.exports = Product