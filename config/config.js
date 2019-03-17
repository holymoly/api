'use strict';

// Load file system module
var fs = require('fs');

// Server Configuration
const hapiServer = {
  port: 8000,
  //Uncomment for https
  tls: {
    key: fs.readFileSync('/etc/mysql/client-key.pem'),
    cert: fs.readFileSync('/etc/mysql/client-cert.pem')
  },
  host: '192.168.123.38',
}

// DB configuration
const mariadb = {
  host: 'localhost',
  user: 'api',
  password: 'testapi',
  db: 'api',
  multiStatements: true,
  compress: true
}

// Logging configuration
const logger = {
  level: {
    auth: 'debug',
    db: 'debug',
    routes: 'debug',
    app: 'debug'
  },
}

module.exports = {
  hapiServer,
  mariadb,
  logger
};