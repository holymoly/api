// Winston logging
'use strict';

// Load winston logger
const winston = require('winston');

// Load Config
var config = require('../../config/config');

// transporter for console
const con = new(winston.transports.Console)({
  timestamp: true,
  colorize: true
})

// Log rotation
const fileAuth = new(require('winston-daily-rotate-file'))({
  filename: './logs/auth_',
  datePattern: 'yyyy-MM-dd',
  prepend: false
})

// Log rotation
const fileDb = new(require('winston-daily-rotate-file'))({
  filename: './logs/auth_',
  datePattern: 'yyyy-MM-dd',
  prepend: false
})

// Log rotation
const fileRoutes = new(require('winston-daily-rotate-file'))({
  filename: './logs/routes_',
  datePattern: 'yyyy-MM-dd',
  prepend: false
})

// Log rotation
const fileApp = new(require('winston-daily-rotate-file'))({
  filename: './logs/app_',
  datePattern: 'yyyy-MM-dd',
  prepend: false
})

// logger for authentication stuff
const logAuth = new(winston.Logger)({
  level: config.logger.level.auth,
  filters: [
    (level, msg, meta) => {
      return 'AUTH: ' + msg;
    }
  ],
  transports: [con, fileAuth]
});

// logger for Database stuff
const logDb = new(winston.Logger)({
  level: config.logger.level.db,
  filters: [
    (level, msg, meta) => {
      return 'DB: ' + msg;
    }
  ],
  transports: [con, fileDb]
});

// logger for route stuff
const logRoutes = new(winston.Logger)({
  level: config.logger.level.routes,
  filters: [
    (level, msg, meta) => {
      return 'ROUTES: ' + msg;
    }
  ],
  transports: [con, fileRoutes]
});

// logger on application stuff
const logApp = new(winston.Logger)({
  level: config.logger.level.app,
  filters: [
    (level, msg, meta) => {
      return 'APP: ' + msg;
    }
  ],
  transports: [con, fileApp]
});

module.exports = {
  logAuth,
  logDb,
  logRoutes,
  logApp
};