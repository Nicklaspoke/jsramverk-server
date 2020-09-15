/**
 * Index file for running the express API server
 */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');

const csrfProtection = csurf({
    cookie: true,
});

const server = express();
server.use(express.json());
server.use(express.json({ type: 'application/merge-patch+json' }));
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
server.use(cookieParser());
server.use(csrfProtection);
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

server.get('/', auth, (req, res) => {
    res.json({ BestPony: 'Littlepip' });
});

server.listen(port, console.log(`Listening on port ${port}`));
