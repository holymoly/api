const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/{stateModelId}/transitions',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create new transition',
            notes: 'Creates a new state transition',
            tags: ['api', 'itemclass', 'statemodel', 'transitions', 'v1'],
            validate: {
                params: schemas.params.stateModelId,
                payload: schemas.payload.create
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        transitionId: 123,
                        stateModelId: request.params.stateModelId,
                        fromStateId: request.payload.fromStateId,
                        toStateId: request.payload.toStateId,
                        name: request.payload.name,
                        description: request.payload.description,
                        validation: request.payload.validation || null
                    }
                };
            }
        }
    }
];

module.exports = routes;