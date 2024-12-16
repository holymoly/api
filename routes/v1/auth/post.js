const Joi = require('joi');
const Boom = require('@hapi/boom');
const authService = require('../../../services/auth');

const routes = [
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
            description: 'Login to get JWT token',
            notes: 'Returns JWT token for authentication',
            tags: ['api', 'auth', 'v1'],
            validate: {
                failAction: async (request, h, err) => {
                    console.error('Validation error:', err);
                    throw Boom.badRequest('Invalid request payload');
                },
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }).label('LoginPayload')
            },
            response: {
                schema: Joi.object({
                    status: Joi.string().required().example('success'),
                    data: Joi.object({
                        token: Joi.string().required(),
                        user: Joi.object({
                            id: Joi.number().required(),
                            username: Joi.string().required(),
                            scope: Joi.array().items(Joi.string()).required()
                        })
                    })
                }).label('LoginResponse'),
                failAction: 'log'
            },
            handler: async (request, h) => {
                try {
                    const { username, password } = request.payload;
                    
                    const user = await authService.validateCredentials(username, password);
                    const token = authService.generateToken(user);
                    
                    return {
                        status: 'success',
                        data: {
                            token,
                            user: {
                                id: user.id,
                                username: user.username,
                                scope: user.scope
                            }
                        }
                    };
                } catch (error) {
                    console.error('Login error:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Login failed');
                }
            }
        }
    }
];

module.exports = routes; 