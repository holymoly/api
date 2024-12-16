const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/{stateModelId}/states',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get all states for state model',
            notes: 'Returns all states defined in the state model',
            tags: ['api', 'itemclass', 'statemodel', 'state', 'v1'],
            validate: {
                params: schemas.params.stateModelId
            },
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            stateId: 1,
                            stateModelId: request.params.stateModelId,
                            name: 'New',
                            description: 'Initial state',
                            isInitial: true,
                            isFinal: false
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{stateModelId}/states/{stateId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get specific state',
            notes: 'Returns a specific state from the state model',
            tags: ['api', 'itemclass', 'statemodel', 'state', 'v1'],
            validate: {
                params: schemas.params.stateId
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
                        name: 'Active',
                        description: 'In use',
                        isInitial: false,
                        isFinal: false
                    }
                };
            }
        }
    }
];

module.exports = routes; 