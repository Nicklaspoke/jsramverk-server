/**
 * Router for handling reports
 */
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const genError = require('../helpers/error');
const { getReport } = require('../models/reports');
router.post('/reports', auth, validate, (req, res) => {
    res.json({ LightBringer: 'Littlepip' });
});

router.get('/reports/week/:weekNum', async (req, res) => {
    console.log('derp');
    const report = await getReport(req.params.weekNum);

    res.status(report.length !== 0 ? 200 : 404).json(
        report.length !== 0
            ? { data: report[0] }
            : genError(
                  404,
                  'Report not found',
                  'Could not find a report with the specified week number',
              ),
    );
});
module.exports = router;
