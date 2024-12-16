const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Get all users',
            notes: 'Returns all users (admin only)',
            tags: ['api', 'users', 'v1'],
            response: {
                schema: schemas.response.list
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: [
                        {
                            userId: 1,
                            username: 'admin',
                            email: 'admin@example.com',
                            firstName: 'Admin',
                            lastName: 'User',
                            role: 'admin',
                            isActive: true,
                            lastLogin: new Date().toISOString()
                        }
                    ]
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/{userId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Get user by ID',
            notes: 'Returns a specific user',
            tags: ['api', 'users', 'v1'],
            validate: {
                params: schemas.params.userId
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        userId: request.params.userId,
                        username: 'user1',
                        email: 'user1@example.com',
                        firstName: 'Test',
                        lastName: 'User',
                        role: 'user',
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    }
                };
            }
        }
    },
    {
        method: 'GET',
        path: '/username/{username}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Get user by username',
            notes: 'Returns a specific user by username',
            tags: ['api', 'users', 'v1'],
            validate: {
                params: schemas.params.username
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        userId: 1,
                        username: request.params.username,
                        email: 'user@example.com',
                        firstName: 'Test',
                        lastName: 'User',
                        role: 'user',
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString()
                    }
                };
            }
        }
    }
];

module.exports = routes;