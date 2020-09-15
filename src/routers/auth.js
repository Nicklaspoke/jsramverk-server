/**
 * Router for handling authentication requests like, login, logout and validate access to a route
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const getCredentials = require('../models/login');
const genError = require('../helpers/error');
const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {
    const credentials = await getCredentials(req.body.email);
    const hash = credentials !== undefined ? credentials.password : '';

    if (!(await bcrypt.compare(req.body.password, hash))) {
        res.status(400).json(
            genError(400, 'Invalid credentials', 'Login failed; Invalid email or password.'),
        );
    } else {
        const token = jwt.sign({}, process.env.JWTSECRET || 'devmode', {
            issuer: 'Nicklaspoke',
            subject: req.body.email,
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ token: token });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(204).json({ data: 'cookie cleared' });
});
module.exports = router;

router.get('/authCheck', auth, (req, res) => {
    res.status(200).json({ data: 'Access Granted' });
});

router.get('/get-csrf-token', (req, res) => {
    res.status(200).json({ csrfToken: req.csrfToken() });
});
