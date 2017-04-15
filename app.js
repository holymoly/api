'use strict';

// Load hapi module
const hapi = require('hapi');

// Load Config
var config = require('./config/config');

// plugins
var plugins = require('./plugins/plugins');

// Load routes definition
var routes = require('./modules/routes/routes');

// Load routes auth
var auth = require('./modules/auth');

// Load logger
var logger = require('./modules/logger').logApp;

// Create a server with a host and port
const server = new hapi.Server();
server.connection(config.hapiServer);

// register plugins
server.register(plugins, (err) => {
  logger.info('Hapi Server registered plugins');
  if (err) {
    logger.error(err);
    throw err;
  }

  // Activate simple auth
  server.auth.strategy('simple', 'basic', {
    validateFunc: auth.validate
  });

  // Activate session auth
  server.auth.strategy('session', 'cookie',{
    cookie: 'api-session',
    password: 'SuperMegaHyperAwesomeSecretPassword',
    isSecure: true
  })

  // Add all routes,
  server.route(routes);

  // Start Server
  start();
});

function start(){
  // Start server
  server.start( (err) => {
    if (err) {
      logger.error(err);
      throw err;
    } else {
      logger.info('Server running at:', server.info.uri);
    }
  });
}

function stop(){
  // Start server
  server.stop( (err) => {
    if (err) {
      logger.error(err);
      throw err;
    } else {
      logger.info('Server stoped!');
    }
  });
}


module.exports.start = start;
module.exports.stop = stop;

