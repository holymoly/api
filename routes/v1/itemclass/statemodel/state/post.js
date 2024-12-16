const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/{stateModelId}/states',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create new state',
            notes: 'Creates a new state in the state model',
            tags: ['api', 'itemclass', 'statemodel', 'state', 'v1'],
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
                        stateId: 123, // Generated ID
                        stateModelId: request.params.stateModelId,
                        name: request.payload.name,
                        description: request.payload.description,
                        isInitial: request.payload.isInitial || false,
                        isFinal: request.payload.isFinal || false,
                        metadata: request.payload.metadata || null
                    }
                };
            }
        }
    }
];

module.exports = routes; 