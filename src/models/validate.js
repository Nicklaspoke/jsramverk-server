/**
 * Validation model for the validate router. Takes care of all database calls
 */
const db = require('../db/db');

const getWeeks = async () => {
    const weeks = await db('report').select('week');
    return weeks;
};

module.exports = {
    getWeeks: getWeeks,
};
