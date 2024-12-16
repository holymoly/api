const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'PUT',
        path: '/{itemId}/properties/{propertyId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Update property value',
            notes: 'Updates an existing property value for the item',
            tags: ['api', 'items', 'properties', 'v1'],
            validate: {
                params: schemas.params.propertyId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: parseInt(request.params.itemId),
                        propertyId: parseInt(request.params.propertyId),
                        propertyName: 'Serial Number',
                        type: 'string',
                        value: request.payload.value,
                        uom: null,
                        lastUpdated: new Date().toISOString()
                    }
                };
            }
        }
    }
];

module.exports = routes;