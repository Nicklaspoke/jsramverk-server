/**
 * Model for handling all different database operations with the '/reports' route
 */
const db = require('../db/db');
const getReport = async (week) => {
    const res = await db('report').select().where({ week: week });
    return res;
};

const createReport = async (content) => {
    try {
        await db('report').insert({
            week: content.week,
            title: content.title,
            content: content.content,
        });
        return true;
    } catch (e) {
        return false;
    }
};

const updateReport = async (content) => {
    try {
        await db('report')
            .update({
                title: content.title,
                content: content.content,
            })
            .where({ week: content.week });
        return true;
    } catch (e) {
        return false;
    }
};
module.exports = {
    getReport: getReport,
    createReport: createReport,
    updateReport: updateReport,
};
