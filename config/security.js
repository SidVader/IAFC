'use strict';

// security.js
var rateLimit  = require('express-rate-limit'),
  csrf         = require('csurf'),
  cookieParser = require('cookie-parser'),
  helmet       = require('helmet');

module.exports = function (app) {
  app.enable('trust proxy');

  // 1. helmet with defaults
  app.use(helmet({ cacheControl: false }));

  // 2. rate-limit to /api/
  app.use('/api/', rateLimit({
    windowMs: 60 * 1000, // seconds
    delayMs: 0,
    max: 5
  }));

  // 3. setup cookies
  var secret = Math.random().toString(36).substring(7);
  app.use(cookieParser(secret));

  // 4. csrf
  var csrfProtection = csrf({ cookie: true });
  app.get('/', csrfProtection, function(req, res, next) {
    req._csrfToken = req.csrfToken();
    next();
  });
};
