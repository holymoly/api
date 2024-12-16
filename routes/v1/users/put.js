const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'PUT',
        path: '/{userId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Update user',
            notes: 'Updates an existing user account',
            tags: ['api', 'users', 'v1'],
            validate: {
                params: schemas.params.userId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        userId: request.params.userId,
                        username: 'username',  // Cannot be updated
                        email: request.payload.email,
                        firstName: request.payload.firstName,
                        lastName: request.payload.lastName,
                        role: request.payload.role,
                        isActive: request.payload.isActive,
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    }
                };
            }
        }
    }
];

module.exports = routes;