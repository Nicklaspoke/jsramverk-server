/**
 * Model for handling account registration
 */
const db = require('../db/db');
const bcrypt = require('bcryptjs');
const genError = require('../helpers/error');

module.exports = registerAccount = async (accountDetails) => {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(accountDetails.password, salt);
    try {
        await db('user').insert({
            email: accountDetails.email,
            password: passwordHash,
        });
        return true;
    } catch (e) {
        return false;
    }
};
