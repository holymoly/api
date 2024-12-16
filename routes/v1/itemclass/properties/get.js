const schemas = require('./schema');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get all properties',
            notes: 'Returns all property definitions',
            tags: ['api', 'itemclass', 'properties', 'v1'],
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            propertyId: 1,
                            name: 'Serial Number',
                            description: 'Equipment serial number',
                            type: 'string',
                            uom: null
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{propertyId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get property by ID',
            notes: 'Returns a specific property definition',
            tags: ['api', 'itemclass', 'properties', 'v1'],
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
                        propertyId: request.params.propertyId,
                        name: 'Serial Number',
                        description: 'Equipment serial number',
                        type: 'string',
                        uom: null
                    }
                };
            }
        }
    }
];

module.exports = routes; 