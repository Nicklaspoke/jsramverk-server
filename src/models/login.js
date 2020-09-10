/**
 * Model for handling login db requests
 */
const knex = require('../db/db');

module.exports = getCredentials = async (user) => {
    const res = await knex('user').select('email', 'password').where({ email: user });
    return res[0];
};
