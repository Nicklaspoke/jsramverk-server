/**
 * Index file for running the express API server
 */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const { getReport } = require('./models/reports');
const genError = require('./helpers/error');
const preFlightCheck = require('./helpers/preFlight');
const csrfProtection = csurf({
    cookie: true,
});

const server = express();
server.use(express.json());
server.use(express.json({ type: 'application/merge-patch+json' }));
server.use(cors());
server.use(cookieParser());
server.use(csrfProtection);
if (process.env.NODE_ENV !== 'test') {
    server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}
//Routers
const auth = require('./routers/auth');
const register = require('./routers/register');
const reports = require('./routers/reports');
const validate = require('./routers/validate');

const port = process.env.PORT || 8080;

//Mounting Routes
server.use('/api/auth', auth);
server.use('/api/auth', register);
server.use('/api/', reports);
server.use('/api/validate', validate);

server.get('/api/', auth, async (req, res) => {
    const presentation = await getReport(0);

    res.status(presentation.length !== 0 ? 200 : 404).json(
        presentation.length !== 0
            ? { data: presentation[0] }
            : genError(
                  404,
                  'presentation not found',
                  'Could not find a presentation with the specified week number',
              ),
    );
});

const serverApp = server.listen(port, () => {
    preFlightCheck();
    console.info(`Listening on port ${port}`);
});

module.exports = serverApp;
