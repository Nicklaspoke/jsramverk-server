/**
 * Model for handling login db requests
 */
const db = require('../db/db');

module.exports = getCredentials = async (user) => {
    const res = await db('user').select('email', 'password').where({ email: user });
    return res[0];
};
