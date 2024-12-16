const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/{itemId}/properties',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get all properties for an item',
            notes: 'Returns all property values for the specified item',
            tags: ['api', 'items', 'properties', 'v1'],
            validate: {
                params: schemas.params.itemId
            },
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            itemId: parseInt(request.params.itemId),
                            propertyId: 1,
                            propertyName: 'Serial Number',
                            type: 'string',
                            value: 'SN123456',
                            uom: null,
                            lastUpdated: new Date().toISOString()
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{itemId}/properties/{propertyId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get specific property for an item',
            notes: 'Returns the value of a specific property for the item',
            tags: ['api', 'items', 'properties', 'v1'],
            validate: {
                params: schemas.params.propertyId
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
                        value: 'SN123456',
                        uom: null,
                        lastUpdated: new Date().toISOString()
                    }
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{itemId}/properties/{propertyId}/history',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get property history',
            notes: 'Returns the history of values for a specific property',
            tags: ['api', 'items', 'properties', 'v1'],
            validate: {
                params: schemas.params.propertyId
            },
            response: {
                schema: schemas.response.history
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            itemId: request.params.itemId,
                            propertyId: request.params.propertyId,
                            value: 'SN123456',
                            timestamp: new Date().toISOString(),
                            updatedBy: 'admin'
                        }
                    ]
                };
            }
        }
    }
];

module.exports = routes;
