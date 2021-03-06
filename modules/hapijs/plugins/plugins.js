'use strict';

// Api Documentation /documentation
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../../package');
const Cookie = require('@hapi/cookie');

// Basic Auth
const BasicAuth = require('@hapi/basic');

// Shown in Documentation
const options = {
  info: {
    'title': 'Test API Documentation',
    'version': Pack.version,
  },
  grouping: 'tags'
};

const inert = Inert

const vision = Vision

const swagger = {
  'register': HapiSwagger,
  'options': options
}

const basicAuth = BasicAuth

const cookie = Cookie

module.exports = [
  inert,
  vision,
  swagger,
  basicAuth,
  cookie
];