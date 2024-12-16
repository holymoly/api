const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get all items',
            notes: 'Returns all items',
            tags: ['api', 'items', 'v1'],
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            itemId: 1,
                            name: 'Item 1',
                            description: 'First item',
                            itemClassId: 1,
                            itemClassName: 'Equipment',
                            currentState: {
                                stateId: 1,
                                name: 'Active'
                            }
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{itemId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get item by ID',
            notes: 'Returns a specific item',
            tags: ['api', 'items', 'v1'],
            validate: {
                params: schemas.params.itemId
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: request.params.itemId,
                        name: 'Item 1',
                        description: 'First item',
                        itemClassId: 1,
                        itemClassName: 'Equipment',
                        currentState: {
                            stateId: 1,
                            name: 'Active'
                        }
                    }
                };
            }
        }
    }
];

module.exports = routes;
