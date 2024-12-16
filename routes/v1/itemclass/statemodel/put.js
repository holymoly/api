const schemas = require('./schema');
const Joi = require('@hapi/joi');

const routes = [
    {
        method: 'PUT',
        path: '/{stateModelId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update state model',
            notes: 'Updates an existing state model definition',
            tags: ['api', 'itemclass', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.stateModelId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        stateModelId: request.params.stateModelId,
                        name: request.payload.name,
                        description: request.payload.description,
                        initialStateId: request.payload.initialStateId,
                        states: [] // Current states would be returned here
                    }
                };
            }
        }
    }
];

module.exports = routes; 