const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const { clearAdminCookie, setAdminCookie } = require('../middleware/adminAuth');

const router = express.Router();
const SESSION_SECONDS = 8 * 60 * 60;

function safeEqual(value, expected) {
    const valueBuffer = Buffer.from(value);
    const expectedBuffer = Buffer.from(expected);
    return valueBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}

router.post('/login', (req, res) => {
    const configuredEmail = process.env.ADMIN_EMAIL;
    const configuredPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!configuredEmail || !configuredPassword || !jwtSecret) {
        return res.status(503).json({ error: 'Admin login configure nahi hai. Backend .env check karein.' });
    }

    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (email !== configuredEmail.trim().toLowerCase() || !safeEqual(password, configuredPassword)) {
        return res.status(401).json({ error: 'Admin ID ya password galat hai.' });
    }

    const token = jwt.sign(
        { sub: configuredEmail, role: 'admin' },
        jwtSecret,
        { expiresIn: SESSION_SECONDS }
    );

    setAdminCookie(res, token);
    res.json({ success: true });
});

router.post('/logout', (req, res) => {
    clearAdminCookie(res);
    res.json({ success: true });
});

module.exports = router;
