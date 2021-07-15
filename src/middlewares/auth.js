const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ msg: 'no token provided' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2)
        return res.status(401).send({ msg: 'token error' });

    const [bearer, token] = parts;
    if (!/^Bearer$/i.test(bearer))
        return res.status(401).send({ msg: 'token malformatted' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err)
            return res.status(401).send({ msg: 'token invalid' });

        req.id = decoded.id;
        req.isAdmin = decoded.isAdmin;

        return next();
    });
}