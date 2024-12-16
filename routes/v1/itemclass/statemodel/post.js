const schemas = require('./schema');
const Joi = require('@hapi/joi');

const routes = [
    {
        method: 'POST',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create new state model',
            notes: 'Creates a new state model definition',
            tags: ['api', 'itemclass', 'statemodel', 'v1'],
            validate: {
                payload: schemas.payload.create
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        stateModelId: 123, // Generated ID
                        name: request.payload.name,
                        description: request.payload.description,
                        initialStateId: request.payload.initialStateId,
                        states: request.payload.states || []
                    }
                };
            }
        }
    }
];

module.exports = routes; 