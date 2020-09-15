/**
 * Middleware for handling validation of request bodies
 */
const validator = require('email-validator');
const genError = require('../helpers/error');

const validate = (req, res, next) => {
    switch (req.path) {
        case '/register':
            if (!validator.validate(req.body.email) || !req.body.password) {
                res.status(400).json(
                    genError(400, 'Missing Credentials', 'Invalid email or no password provided'),
                );
            } else {
                next();
            }
            break;

        case '/reports':
            if (!req.body.week || !req.body.title || !req.body.content) {
                res.status(400).json(
                    genError(
                        400,
                        'Missing mandatory parameters',
                        'mandatory parameter week or title are missing',
                    ),
                );
            } else {
                next();
            }
            break;

        default:
            next();
            break;
    }
};

module.exports = validate;
