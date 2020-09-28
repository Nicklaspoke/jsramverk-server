/**
 * Router for handling reports
 */
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const genError = require('../helpers/error');
const { getReport, createReport, updateReport } = require('../models/reports');

router.post('/reports', auth, validate, async (req, res) => {
    const success = await createReport(req.body);
    res.status(success ? 201 : 400).json(
        success
            ? { data: 'Report Created' }
            : genError(
                  400,
                  'Invalid Week',
                  'specified week is not valiid or has already a report created',
              ),
    );
});

router.put('/reports/week/:weekNum', auth, validate, async (req, res) => {
    const sucess = await updateReport(req.body);
    res.status(sucess ? 201 : 500).json(
        sucess
            ? { data: 'Report updated' }
            : genError(500, 'Internal server error', 'something went wrong when trying to update'),
    );
});

router.get('/reports/week/:weekNum', async (req, res) => {
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
