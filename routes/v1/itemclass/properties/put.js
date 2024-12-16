const schemas = require('./schema');

const routes = [
    {
        method: 'PUT',
        path: '/{propertyId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update property',
            notes: 'Updates an existing property definition',
            tags: ['api', 'itemclass', 'properties', 'v1'],
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
                        propertyId: request.params.propertyId,
                        name: request.payload.name,
                        description: request.payload.description,
                        type: request.payload.type,
                        uom: request.payload.uom
                    }
                };
            }
        }
    }
];

module.exports = routes;