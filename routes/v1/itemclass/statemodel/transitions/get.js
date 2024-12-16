const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/{stateModelId}/transitions',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get all transitions',
            notes: 'Returns all transitions defined in the state model',
            tags: ['api', 'itemclass', 'statemodel', 'transitions', 'v1'],
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
                            transitionId: 1,
                            stateModelId: request.params.stateModelId,
                            fromStateId: 1,
                            fromStateName: 'New',
                            toStateId: 2,
                            toStateName: 'Active',
                            name: 'Activate',
                            description: 'Transition from New to Active'
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{stateModelId}/transitions/{transitionId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get specific transition',
            notes: 'Returns a specific transition from the state model',
            tags: ['api', 'itemclass', 'statemodel', 'transitions', 'v1'],
            validate: {
                params: schemas.params.transitionId
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
                        fromStateId: 1,
                        fromStateName: 'New',
                        toStateId: 2,
                        toStateName: 'Active',
                        name: 'Activate',
                        description: 'Transition from New to Active'
                    }
                };
            }
        }
    }
];

module.exports = routes; 