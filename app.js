'use strict';

const Hapi = require('hapi');

// Load Config
var config = require('./config/config');

// plugins
var plugins = require('./plugins/plugins')
//Load routes definition
var routes = require('./modules/routes');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection(config.server);

// register plugins
server.register([plugins.inert, plugins.vision, plugins.swagger], (err) => {
  // Add the route
  server.route(routes.hello);
  // Start server
  server.start( (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running at:', server.info.uri);
    }
  });
});


