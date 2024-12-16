const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create new item',
            notes: 'Creates a new item',
            tags: ['api', 'items', 'v1'],
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
                        itemId: 123, // Generated ID
                        name: request.payload.name,
                        description: request.payload.description,
                        itemClassId: request.payload.itemClassId,
                        itemClassName: 'Equipment', // Would be looked up from itemClass
                        currentState: null // Initial state would be set based on itemClass stateModel
                    }
                };
            }
        }
    },
    {
        method: 'POST',
        path: '/bulk',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create multiple items',
            notes: 'Creates multiple items in a single request',
            tags: ['api', 'items', 'v1'],
            validate: {
                payload: schemas.payload.bulk
            },
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                const createdItems = request.payload.map((item, index) => ({
                    itemId: 123 + index,
                    name: item.name,
                    description: item.description,
                    itemClassId: item.itemClassId,
                    itemClassName: 'Equipment',
                    currentState: null
                }));

                return {
                    status: 'success',
                    data: createdItems
                };
            }
        }
    }
];

module.exports = routes;
