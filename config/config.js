'use strict';

// Load file system module
var fs = require('fs');

// Server Configuration
const hapiServer = {
  port: process.env.HAPIPORT || 8000,
  address: process.env.HAPIHOST || '127.0.0.1',
  //Uncomment for https
  //tls: {
  //  key: process.env.HAPIKEY || fs.readFileSync('./config/certs/server-key.pem'),
  //  cert: process.env.HAPICERT || fs.readFileSync('./config/certs/server-cert.pem')
  //}
}

// postgres configuration
const postgres = {
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || '5432',
  user: process.env.PGUSER || 'root',
  password: process.env.PGPASSWORD || 'test',
  database: process.env.PGDATABASE || 'api',
}

// rabbitmq databus
const databus = {
  host: process.env.DATABUSHOST || '127.0.0.1',
  port: process.env.DATABUSPORT || 1883,
  username: process.env.DATABUSUSER || 'test',
  password: process.env.DATABUSPASSWORD || 'test',
  //key: process.env.DATABUSSSLKEY || fs.readFileSync('./config/certs/client-key.pem'),
  //cert: process.env.DATABUSSSLCERT || fs.readFileSync('./config/certs/client-cert.pem'),
  //rejectUnauthorized: process.env.DATABUSSSLREJECTUNAUTHORIZED || false,
  //##### The CA list will be used to determine if server is authorized
  //ca: process.env.DATABUSSSLCA || fs.readFileSync('./config/certs/ca-cert.pem'),
  protocol: process.env.DATABUSPROTOCOL || 'mqtt' // mqtt or mqtts
}

// Logging configuration
const logger = {
  level: {
    auth: process.env.LGAUTHLEVEL || 'debug',
    db: process.env.LGDBLEVEL || 'debug',
    routes: process.env.LGROUTESLEVEL || 'debug',
    app: process.env.LGAPPLEVEL || 'debug',
    databus: process.env.LGDATABUSLEVEL || 'debug'
  },
}

module.exports = {
  hapiServer,
  postgres,
  logger,
  databus
};
