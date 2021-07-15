const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    generateHash: async (password) => {
        return await new Promise((resolve, reject) => {
            bcrypt.hash(password, bcrypt.genSaltSync(8), (error, hash) => {
                if (error)
                    reject(error);
                resolve(hash);
            })
        })
    },
    validPassword: async (password, hash) => (
        await new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (error, bool) => {
                if (error)
                    reject(error);
                resolve(bool);
            })
        })
    ),
    generateToken: (data = {}) => jwt.sign(data, process.env.SECRET, { expiresIn: '7d' })
}
