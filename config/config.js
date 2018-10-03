'use strict';

// Load file system module
var fs = require('fs');

// Server Configuration
const hapiServer = {
  port: 8000,
  //Uncomment for https
  tls:{
    key: fs.readFileSync('/var/db/mysql/ssl/client-key.pem'),
    cert: fs.readFileSync('/var/db/mysql/ssl/clienclient-cert.pem')
  },
  host: 'localhost',
}

// DB configuration
const mariadb = {
  host: '127.0.0.1',
  user: 'test',
  password: 'test',
  db: 'test',
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
