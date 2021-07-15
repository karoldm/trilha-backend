const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            zip_code: DataTypes.STRING(9),
            cpf: DataTypes.STRING(14),
            is_admin: DataTypes.TINYINT,
            created_at: DataTypes.DATE,
        }, {
            sequelize: connection
        })
    }
}

module.exports = User