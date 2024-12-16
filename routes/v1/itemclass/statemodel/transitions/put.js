const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'PUT',
        path: '/{stateModelId}/transitions/{transitionId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update transition',
            notes: 'Updates an existing state transition',
            tags: ['api', 'itemclass', 'statemodel', 'transitions', 'v1'],
            validate: {
                params: schemas.params.transitionId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        transitionId: request.params.transitionId,
                        stateModelId: request.params.stateModelId,
                        fromStateId: request.payload.fromStateId,
                        toStateId: request.payload.toStateId,
                        name: request.payload.name,
                        description: request.payload.description,
                        validation: request.payload.validation
                    }
                };
            }
        }
    }
];

module.exports = routes; 