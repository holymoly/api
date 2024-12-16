const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'DELETE',
        path: '/{stateModelId}/states/{stateId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete state',
            notes: 'Deletes a state from the state model',
            tags: ['api', 'itemclass', 'statemodel', 'state', 'v1'],
            validate: {
                params: schemas.params.stateId
            },
            response: {
                schema: schemas.response.delete
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: `State ${request.params.stateId} deleted successfully`
                };
            }
        }
    }
];

module.exports = routes; 