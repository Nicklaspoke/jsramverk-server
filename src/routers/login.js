/**
 * Router for handling logins
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const getCredentials = require('../models/login');
const genError = require('../helpers/error');

router.post('/login', async (req, res) => {
    credentials = await getCredentials(req.body.email);

    const hash = credentials !== undefined ? credentials.password : '';

    if (!(await bcrypt.compare(req.body.password, hash))) {
        res.status(400).json(
            genError(400, 'Invalid credentials', 'Login failed; Invalid email or password.'),
        );
    }

    const token = jwt.sign({}, process.env.JWTSECRET || 'devmode', {
        issuer: 'Nicklaspoke',
        subject: req.body.email,
        expiresIn: '1h',
    });

    res.status(200).json({ token: token });
});
module.exports = router;
