const schemas = require('./schema');
const Joi = require('joi');
const users = require('../../../DBM/users');
const Boom = require('@hapi/boom');

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
                try {
                    const userList = await users.list();
                    return {
                        status: 'success',
                        data: userList
                    };
                } catch (error) {
                    console.error('Error listing users:', error);
                    throw Boom.internal('Failed to list users');
                }
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
                try {
                    const user = await users.findById(request.params.userId);
                    if (!user) {
                        throw Boom.notFound('User not found');
                    }
                    return {
                        status: 'success',
                        data: user
                    };
                } catch (error) {
                    console.error('Error getting user:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Failed to get user');
                }
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
                try {
                    const user = await users.findByUsername(request.params.username);
                    if (!user) {
                        throw Boom.notFound('User not found');
                    }
                    return {
                        status: 'success',
                        data: user
                    };
                } catch (error) {
                    console.error('Error getting user:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Failed to get user');
                }
            }
        }
    }
];

module.exports = routes;