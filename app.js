'use strict';

const hapi = require('hapi');

// Load Config
var config = require('./config/config');

// plugins
var plugins = require('./plugins/plugins');

//Load routes definition
var routes = require('./modules/routes');

//Load routes auth
var auth = require('./modules/auth');

//Load logger
var logger = require('./modules/logger').logApp;

// Create a server with a host and port
const server = new hapi.Server();
server.connection(config.hapiServer);

// register plugins
server.register([plugins.inert, plugins.vision, plugins.swagger, plugins.basicAuth], (err) => {
  logger.info('Hapi Server registered plugins');
  if (err) {
    logger.error(err);
    throw err;
  }

  server.auth.strategy('simple', 'basic', { validateFunc: auth.validate });

  // Add the route
  server.route(routes.root);
  server.route(routes.hello); // With basic authentication
  server.route(routes.hello_id); // with variabl id
  server.route(routes.databases); // gets databases
  logger.info('Added routes');

  // Start server
  server.start( (err) => {
    if (err) {
      logger.error(err);
      throw err;
    } else {
      logger.info('Server running at:', server.info.uri);
    }
  });
});


