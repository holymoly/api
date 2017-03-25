// Api Documentation /documentation
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

// Basic Auth
const BasicAuth = require('hapi-auth-basic');

// Shown in Documentation
const options = {
  info: {
    'title': 'Test API Documentation',
    'version': Pack.version,
  },
  grouping: 'tags'
};

var plugins = {};

plugins.inert = Inert

plugins.vision = Vision

plugins.swagger = {
  'register': HapiSwagger,
  'options': options
}

plugins.basicAuth = BasicAuth

module.exports = plugins;
