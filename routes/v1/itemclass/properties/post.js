const schemas = require('./schema');

const routes = [
    {
        method: 'POST',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create new property definition',
            notes: 'Creates a new property definition for item classes',
            tags: ['api', 'itemclass', 'properties', 'v1'],
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
                        propertyId: 123,
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