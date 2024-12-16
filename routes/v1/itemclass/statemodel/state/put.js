const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'PUT',
        path: '/{stateModelId}/states/{stateId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update state',
            notes: 'Updates an existing state in the state model',
            tags: ['api', 'itemclass', 'statemodel', 'state', 'v1'],
            validate: {
                params: schemas.params.stateId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        stateId: request.params.stateId,
                        stateModelId: request.params.stateModelId,
                        name: request.payload.name,
                        description: request.payload.description,
                        isInitial: request.payload.isInitial,
                        isFinal: request.payload.isFinal,
                        metadata: request.payload.metadata
                    }
                };
            }
        }
    }
];

module.exports = routes; 