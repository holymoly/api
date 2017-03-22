
// Parameter validation
const Joi = require('joi');

var routes = {};

routes.hello = {
  method: 'GET',
  path:'/hello/{id}', 
  config: {
    handler: function (request, reply) {
      return reply('hello id: ' + request.params.id);
    },
    description: 'Get back id',
    notes: 'Returns a todo item by the id passed in the path',
    tags: ['api'], // Tag for swagger
    validate: {
      params: {
        id : Joi.number()
          .required()
          .description('the id for the todo item'),
      }
    }
  }
}


module.exports = routes;