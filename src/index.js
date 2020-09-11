/**
 * Index file for running the express API server
 */
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(express.json({ type: 'application/merge-patch+json' }));
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//Routers
const login = require('./routers/login');
const register = require('./routers/register');
const reports = require('./routers/reports');
const validate = require('./routers/validate');

const port = process.env.PORT || 8080;

//Mounting Routes
server.use('/auth', login);
server.use('/auth', register);
server.use('/', reports);
server.use('/validate', validate);

server.get('/', auth, (req, res) => {
    res.json({ BestPony: 'Littlepip' });
});

server.listen(port, console.log(`Listening on port ${port}`));
