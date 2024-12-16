const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'DELETE',
        path: '/{stateModelId}/transitions/{transitionId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete transition',
            notes: 'Deletes a state transition',
            tags: ['api', 'itemclass', 'statemodel', 'transitions', 'v1'],
            validate: {
                params: schemas.params.transitionId
            },
            response: {
                schema: schemas.response.delete
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: `Transition ${request.params.transitionId} deleted successfully`
                };
            }
        }
    }
];

module.exports = routes; 