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
            description: 'Get all item classes',
            notes: 'Returns all item class definitions',
            tags: ['api', 'itemclass', 'v1'],
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        { 
                            itemClassId: 1, 
                            name: 'Equipment',
                            description: 'Equipment class',
                            type: 'Equipment'
                        },
                        { 
                            itemClassId: 2, 
                            name: 'Material',
                            description: 'Material class',
                            type: 'Material'
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{classId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get item class by ID',
            notes: 'Returns a specific item class definition',
            tags: ['api', 'itemclass', 'v1'],
            validate: {
                params: schemas.params.classId
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        itemClassId: request.params.classId,
                        name: 'Equipment',
                        description: 'Equipment class',
                        type: 'Equipment'
                    }
                };
            }
        }
    }
];

module.exports = routes; 