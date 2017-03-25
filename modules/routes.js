
// Parameter validation
const Joi = require('joi');

// mariaDb
const mariadb = require('./mariadb/mariadb');

// Load logger
var logger = require('../modules/logger').logRoutes;

// Load query
const query = require('./mariadb/query');

var routes = {};


// localhost:8000/
routes.root = {
  method: 'GET',
  path:'/',
  config: {
    handler: (request, reply) => {
      logger.debug('Reply with: ' + 'welcome to the root');
      return reply('welcome to the root');
    },
    description: 'answer if root path was called',
    notes: 'Returns "welcome to the root"',
    tags: ['api'], // Tags for swagger
    validate: {
    }
  }
}

// localhost:8000/hello
routes.hello = {
  method: 'GET',
  path:'/hello',
  config: {
    auth: 'simple',
    handler: (request, reply) => {
      logger.debug('Reply with: ' + 'Hi, nice to meet you!');
      return reply('Hi, nice to meet you!');
    },
    description: 'Get back id',
    notes: 'Returns a welcome message',
    tags: ['api','auth'], // Tags for swagger
    validate: {
    }
  }
}

// localhost:8000/hello/{id}
routes.hello_id = {
  method: 'GET',
  path:'/hello/{id}',
  config: {
    handler: (request, reply) => {
      logger.debug('Reply with: ' + 'hello id: ' + request.params.id);
      return reply('hello id: ' + request.params.id);
    },
    description: 'Get back id',
    notes: 'Returns the passed {id}',
    tags: ['api'], // Tags for swagger
    validate: {
      params: {
        // Validate the id parameter
        id : Joi.number()
          .required()
          .description('the id for the todo item'),
      }
    }
  }
}

// localhost:8000/databases
routes.databases = {
  method: 'GET',
  path:'/databases',
  config: {
    handler: (request, reply) => {
      return mariadb.query(query.databases,'', (err, result) => {
        if (err) {
          logger.error('Query Error:'  + err);
          return reply (err);
        } else {
          logger.debug('Query Result: ' + result);
          return reply (result);
        }
      });
    },
    description: 'Get databases',
    notes: 'Returns all databases',
    tags: ['api'], // Tags for swagger
    validate: {
      params: {
      }
    }
  }
}

module.exports = routes;
