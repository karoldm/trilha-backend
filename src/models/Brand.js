const { Model, DataTypes } = require('sequelize')

class Brand extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection
        })
    }

    static associate(models) {
        this.hasMany(models.Product, { foreignKey: 'id_brand', as: 'products' })
    }
}

module.exports = Brand