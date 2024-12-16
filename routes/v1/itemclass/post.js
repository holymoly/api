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
            description: 'Create new item class',
            notes: 'Creates a new item class definition',
            tags: ['api', 'itemclass', 'v1'],
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
                        itemClassId: 123, // Generated ID
                        name: request.payload.name,
                        description: request.payload.description,
                        type: request.payload.type
                    }
                };
            }
        }
    }
];

module.exports = routes; 