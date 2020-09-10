/**
 * Middleware for handling validation of request bodies
 */
const validator = require('email-validator');
const genError = require('../helpers/error');

module.exports = validate = (req, res, next) => {
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
            const { week, titel } = req.body;
            if (!week || !titel) {
                res.status(400).json(
                    genError(
                        400,
                        'Missing mandatory parameters',
                        'mandatory parameter week or titel are missing',
                    ),
                );
            } else {
                next();
            }

        default:
            next();
            break;
    }
};
