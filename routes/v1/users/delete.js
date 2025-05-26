const schemas = require('./schema');
const Joi = require('joi');
const users = require('../../../DBM/users');
const Boom = require('@hapi/boom');

const routes = [
    {
        method: 'DELETE',
        path: '/{userId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete user',
            notes: 'Deletes a user account',
            tags: ['api', 'users', 'v1'],
            validate: {
                params: schemas.params.userId
            },
            response: {
                schema: Joi.object({
                    status: Joi.string().required().example('success'),
                    message: Joi.string().required().example('User deleted successfully')
                }).label('DeleteUserResponse')
            },
            handler: async (request, h) => {
                try {
                    const { userId } = request.params;

                    // Check if user exists
                    const existingUser = await users.findById(userId);
                    if (!existingUser) {
                        throw Boom.notFound('User not found');
                    }

                    // Delete user
                    await users.delete(userId);

                    return {
                        status: 'success',
                        message: 'User deleted successfully'
                    };
                } catch (error) {
                    console.error('Error deleting user:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Failed to delete user');
                }
            }
        }
    }
];

module.exports = routes;