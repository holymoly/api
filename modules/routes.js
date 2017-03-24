
// Parameter validation
const Joi = require('joi');

// mariaDb 
const mariadb = require('./mariadb');

var routes = {};


// localhost:8000/
routes.root = {
  method: 'GET',
  path:'/',
  config: {
    handler: (request, reply) => {
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
      return reply('Hi, nice to meet you!');
    },
    description: 'Get back id',
    notes: 'Returns a welcome message',
    tags: ['api'], // Tags for swagger
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

// localhost:8000/hello/{id}
routes.databases = {
  method: 'GET',
  path:'/databases',
  config: {
    handler: (request, reply) => {
      return mariadb.query('SHOW DATABASES;','', (err, result) => {
        if (err) {
          return reply (err);
        } else {
          console.log('Result: ' + result);
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
