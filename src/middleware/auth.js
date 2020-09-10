/**
 * Middleware for handling the JWT authentication
 */
const jwt = require('jsonwebtoken');
const genError = require('../helpers/error');

const auth = (req, res, next) => {
    if (!req.header('x-access-token')) {
        res.status(403).json(
            genError(403, 'No token provided', 'No access token provided in header'),
        );
    } else {
        jwt.verify(req.header('x-access-token'), process.env.JWTSECRET, (err, decoded) => {
            if (err) {
                res.status(401).json(
                    genError(401, 'Invalid token', 'Token invalid or has expired'),
                );
            } else {
                next();
            }
        });
    }
};

module.exports = auth;
