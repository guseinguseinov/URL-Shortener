import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests for this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

export default apiLimiter;