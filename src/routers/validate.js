/**
 * A collection of routes used for validation purposes on the client side, eg. Check if an email is already in use, which report weeks that are avilable for creation
 */
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const { getWeeks } = require('../models/validate');
router.get('/email');

/**
 * Retrives all report weeks that are filled and returns the non populated weeks to the client
 */
router.get('/avilableWeeks', auth, async (req, res) => {
    let weeks = await getWeeks();
    let allWeeks = [1, 2, 3, 4, 5, 6, 7];
    weeks = weeks.map((week) => week.week);
    const avilableWeeks = allWeeks.filter((week) => !weeks.includes(week));
    res.status(200).json({ data: avilableWeeks });
});

/**
 * Retrives all weeks that has a report
 */
router.get('/populatedWeeks', auth, async (req, res) => {
    let weeks = await getWeeks();
    weeks = weeks.map((week) => week.week);
    res.status(200).json({ data: weeks });
});
module.exports = router;
