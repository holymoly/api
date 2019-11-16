'use strict';

// Api Documentation /documentation
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../../package');
const Cookie = require('@hapi/cookie');


// Shown in Documentation
const options = {
  info: {
    'title': 'Items API Documentation',
    'version': Pack.version,
  }
};

const inert = Inert

const vision = Vision

const swagger = {
  'register': HapiSwagger,
  'options': options
}

const cookie = Cookie

module.exports = [
  inert,
  vision,
  swagger,
  cookie
];