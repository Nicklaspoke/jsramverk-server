/**
 * Router for handling register request for a new user
 */
const express = require('express');
const router = express.Router();

const validate = require('../middleware/validation');
const genError = require('../helpers/error');
const registerAccount = require('../models/register');
router.post('/register', validate, async (req, res) => {
    const success = await registerAccount(req.body);
    if (success) {
        res.status(201).json({ data: 'Account created' });
    } else {
        res.status(400).json(
            genError(400, 'Email already in use', 'provided email is already registerd'),
        );
    }
});

module.exports = router;
