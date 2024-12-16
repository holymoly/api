const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/{itemId}/state',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get item state information',
            notes: 'Returns current state and available transitions',
            tags: ['api', 'items', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.itemId
            },
            response: {
                schema: schemas.response.current
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: request.params.itemId,
                        currentState: {
                            stateId: 1,
                            name: 'Active',
                            description: 'Item is active',
                            enteredAt: new Date().toISOString(),
                            enteredBy: 'admin'
                        },
                        availableTransitions: [
                            {
                                transitionId: 1,
                                name: 'Deactivate',
                                description: 'Deactivate item',
                                toStateId: 2,
                                toStateName: 'Inactive',
                                validation: {
                                    requiredProperties: [
                                        {
                                            propertyId: 1,
                                            name: 'Reason',
                                            isSatisfied: false
                                        }
                                    ],
                                    conditions: []
                                }
                            }
                        ]
                    }
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{itemId}/state/history',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get item state history',
            notes: 'Returns the history of state changes',
            tags: ['api', 'items', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.itemId
            },
            response: {
                schema: schemas.response.history
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            stateId: 1,
                            stateName: 'New',
                            enteredAt: new Date(Date.now() - 86400000).toISOString(),
                            enteredBy: 'admin',
                            exitedAt: new Date().toISOString(),
                            comment: 'Initial state',
                            transitionId: 1,
                            transitionName: 'Activate'
                        }
                    ]
                };
            }
        }
    }
];

module.exports = routes; 