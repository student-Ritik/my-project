const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'aasram_admin';
const SESSION_SECONDS = 8 * 60 * 60;

function getAdminToken(req) {
    const cookieHeader = req.headers.cookie || '';
    const cookie = cookieHeader
        .split(';')
        .map(part => part.trim())
        .find(part => part.startsWith(`${COOKIE_NAME}=`));

    return cookie ? cookie.slice(COOKIE_NAME.length + 1) : null;
}

function isAdminAuthenticated(req) {
    const token = getAdminToken(req);
    if (!token || !process.env.JWT_SECRET) return false;

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload.role === 'admin';
    } catch (error) {
        return false;
    }
}

function requireAdminAuth(req, res, next) {
    if (!isAdminAuthenticated(req)) {
        return res.status(401).json({ error: 'कृपया पहले admin login करें।' });
    }

    next();
}

function setAdminCookie(res, token) {
    const options = [
        `${COOKIE_NAME}=${token}`,
        'HttpOnly',
        'SameSite=Strict',
        'Path=/',
        `Max-Age=${SESSION_SECONDS}`
    ];

    if (process.env.NODE_ENV === 'production') options.push('Secure');
    res.setHeader('Set-Cookie', options.join('; '));
}

function clearAdminCookie(res) {
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`);
}

module.exports = {
    clearAdminCookie,
    isAdminAuthenticated,
    requireAdminAuth,
    setAdminCookie
};
