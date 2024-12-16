const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/{itemId}/properties',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Set property value',
            notes: 'Sets a new property value for the item',
            tags: ['api', 'items', 'properties', 'v1'],
            validate: {
                params: schemas.params.itemId,
                payload: schemas.payload.create
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemId: parseInt(request.params.itemId),
                        propertyId: request.payload.propertyId,
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