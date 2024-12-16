const schemas = require('./schema');
const Joi = require('@hapi/joi');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get all state models',
            notes: 'Returns all state model definitions',
            tags: ['api', 'itemclass', 'statemodel', 'v1'],
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            stateModelId: 1,
                            name: 'Equipment Lifecycle',
                            description: 'Equipment lifecycle states',
                            initialStateId: 1,
                            stateCount: 5
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{stateModelId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get state model by ID',
            notes: 'Returns a specific state model definition',
            tags: ['api', 'itemclass', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.stateModelId
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        stateModelId: request.params.stateModelId,
                        name: 'Equipment Lifecycle',
                        description: 'Equipment lifecycle states',
                        initialStateId: 1,
                        states: [
                            {
                                stateId: 1,
                                name: 'New',
                                description: 'Initial state',
                                isInitial: true,
                                isFinal: false
                            }
                        ]
                    }
                };
            }
        }
    }
];

module.exports = routes; 