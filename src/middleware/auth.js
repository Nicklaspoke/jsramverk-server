/**
 * Middleware for handling the JWT authentication
 */
const jwt = require('jsonwebtoken');
const genError = require('../helpers/error');

const auth = (req, res, next) => {
    if (
        (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') &&
        req.cookies.token === process.env.DEVTOKEN
    ) {
        next();
    } else if (!req.cookies.token) {
        res.status(403).json(
            genError(403, 'No token provided', 'No access token provided in cookie'),
        );
    } else {
        jwt.verify(req.cookies.token, process.env.JWTSECRET, (err) => {
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
