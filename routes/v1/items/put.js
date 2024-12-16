const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'PUT',
        path: '/{itemId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update item',
            notes: 'Updates an existing item',
            tags: ['api', 'items', 'v1'],
            validate: {
                params: schemas.params.itemId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: request.params.itemId,
                        name: request.payload.name,
                        description: request.payload.description,
                        itemClassId: request.payload.itemClassId,
                        itemClassName: 'Equipment', // Would be looked up from itemClass
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
