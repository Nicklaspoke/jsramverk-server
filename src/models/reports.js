/**
 * Model for handling all different database operations with the '/reports' route
 */
const db = require('../db/db');
const getReport = async (week) => {
    const res = await db('report').select().where({ week: week });
    return res;
};

module.exports = {
    getReport: getReport,
};
