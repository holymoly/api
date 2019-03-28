'use strict';

// Load file system module
var fs = require('fs');

// Server Configuration
const hapiServer = {
  port: 8000,
  //Uncomment for https
  tls: {
    key: fs.readFileSync('./config/certs/server-key.pem'),
    cert: fs.readFileSync('./config/certs/server-cert.pem')
  },
  host: '127.0.0.1',
}

// DB configuration
const mariadb = {
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'api',
  multipleStatements: true,
  compress: true,
  port: 3307,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('./config/certs/ca-cert.pem'),
    cert: fs.readFileSync('./config/certs/client-cert.pem'),
    key: fs.readFileSync('./config/certs/client-key.pem')
  }
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