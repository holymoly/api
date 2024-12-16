const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Create new user',
            notes: 'Creates a new user account',
            tags: ['api', 'users', 'v1'],
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
                        userId: 123, // Generated ID
                        username: request.payload.username,
                        email: request.payload.email,
                        firstName: request.payload.firstName,
                        lastName: request.payload.lastName,
                        role: request.payload.role || 'user',
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        lastLogin: null
                    }
                };
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
            description: 'User login',
            notes: 'Authenticates a user and returns a JWT token',
            tags: ['api', 'users', 'auth', 'v1'],
            validate: {
                payload: schemas.payload.login
            },
            response: {
                schema: schemas.response.login
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    data: {
                        token: 'jwt.token.here',
                        user: {
                            userId: 1,
                            username: request.payload.username,
                            role: 'user',
                            firstName: 'Test',
                            lastName: 'User'
                        }
                    }
                };
            }
        }
    },
    {
        method: 'POST',
        path: '/change-password',
        options: {
            auth: {
                strategy: 'jwt_strategy'
            },
            description: 'Change password',
            notes: 'Changes the password for the authenticated user',
            tags: ['api', 'users', 'auth', 'v1'],
            validate: {
                payload: schemas.payload.changePassword
            },
            response: {
                schema: Joi.object({
                    status: Joi.string().required().example('success'),
                    message: Joi.string().required().example('Password changed successfully')
                }).label('ChangePasswordResponse')
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: 'Password changed successfully'
                };
            }
        }
    }
];

module.exports = routes;