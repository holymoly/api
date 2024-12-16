const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/{itemId}/state/transition',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Execute state transition',
            notes: 'Executes a state transition for the item',
            tags: ['api', 'items', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.itemId,
                payload: schemas.payload.transition
            },
            response: {
                schema: schemas.response.transition
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: request.params.itemId,
                        previousState: {
                            stateId: 1,
                            name: 'Active'
                        },
                        currentState: {
                            stateId: 2,
                            name: 'Inactive'
                        },
                        transitionId: request.payload.transitionId,
                        transitionName: 'Deactivate',
                        timestamp: new Date().toISOString(),
                        executedBy: 'admin',
                        comment: request.payload.comment
                    }
                };
            }
        }
    },
    {
        method: 'POST',
        path: '/{itemId}/state',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Set item state',
            notes: 'Directly sets the state of an item (admin override)',
            tags: ['api', 'items', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.itemId,
                payload: schemas.payload.setState
            },
            response: {
                schema: schemas.response.transition
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: request.params.itemId,
                        previousState: {
                            stateId: 1,
                            name: 'Active'
                        },
                        currentState: {
                            stateId: request.payload.stateId,
                            name: 'Inactive'
                        },
                        transitionId: null,
                        transitionName: null,
                        timestamp: new Date().toISOString(),
                        executedBy: 'admin',
                        comment: request.payload.comment
                    }
                };
            }
        }
    }
];

module.exports = routes; 