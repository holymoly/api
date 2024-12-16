const schemas = require('./schema');

const routes = [
    {
        method: 'PUT',
        path: '/{classId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update item class',
            notes: 'Updates an existing item class definition',
            tags: ['api', 'itemclass', 'v1'],
            validate: {
                params: schemas.params.classId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemClassId: request.params.classId,
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