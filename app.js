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

// Create a server with a host and port
const server = new hapi.Server();
server.connection(config.hapiServer);

// register plugins
server.register([plugins.inert, plugins.vision, plugins.swagger, plugins.basicAuth], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('simple', 'basic', { validateFunc: auth.validate });

  // Add the route
  server.route(routes.root);
  server.route(routes.hello); // With basic authentication
  server.route(routes.hello_id);
  server.route(routes.databases);

  // Start server
  server.start( (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Server running at:', server.info.uri);
    }
  });
});


