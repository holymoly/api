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

// custom format
const custFormat = {
  format: winston.format.combine(
    winston.format.label({
      label: 'test'
    }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
}

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
const logAuth = winston.createLogger({
  level: config.logger.level.auth,
  format: winston.format.combine(
    winston.format.label({
      label: 'AUTH '
    }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: [con, fileAuth]
});

// logger for Database stuff
const logDb = new(winston.createLogger)({
  level: config.logger.level.db,
  format: winston.format.combine(
    winston.format.label({
      label: 'DB   '
    }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: [con, fileDb]
});

// logger for route stuff
const logRoutes = new(winston.createLogger)({
  level: config.logger.level.routes,
  format: winston.format.combine(
    winston.format.label({
      label: 'ROUTE'
    }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: [con, fileRoutes]
});

// logger on application stuff
const logApp = new(winston.createLogger)({
  level: config.logger.level.app,
  format: winston.format.combine(
    winston.format.label({
      label: 'APP  '
    }),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `[${info.timestamp}] [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: [con, fileApp]
});

module.exports = {
  logAuth,
  logDb,
  logRoutes,
  logApp
};