const schemas = require('./schema');
const Joi = require('joi');
const users = require('../../../DBM/users');
const Boom = require('@hapi/boom');

const routes = [
    {
        method: 'PUT',
        path: '/{userId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin', 'user']
            },
            description: 'Update user',
            notes: 'Updates an existing user account. Admins can update any user, users can only update their own profile.',
            tags: ['api', 'users', 'v1'],
            validate: {
                params: schemas.params.userId,
                payload: schemas.payload.update
            },
            response: {
                schema: schemas.response.single
            },
            handler: async (request, h) => {
                try {
                    const { userId } = request.params;
                    const updateData = request.payload;
                    const requestUser = request.auth.credentials.user;
                    const requestScope = request.auth.credentials.scope;

                    // Check if user exists
                    const existingUser = await users.findById(userId);
                    if (!existingUser) {
                        throw Boom.notFound('User not found');
                    }

                    // If not admin, user can only update their own profile
                    if (requestScope !== 'admin' && existingUser.username !== requestUser) {
                        throw Boom.forbidden('You can only update your own profile');
                    }

                    // Only admins can update roles
                    if (updateData.role && requestScope !== 'admin') {
                        throw Boom.forbidden('Only admins can update user roles');
                    }

                    // If updating username, check if new username is available
                    if (updateData.username && updateData.username !== existingUser.username) {
                        const userWithNewUsername = await users.findByUsername(updateData.username);
                        if (userWithNewUsername) {
                            throw Boom.conflict('Username already exists');
                        }
                    }

                    // Update user
                    const updatedUser = await users.update(userId, updateData);

                    return {
                        status: 'success',
                        data: updatedUser
                    };
                } catch (error) {
                    console.error('Error updating user:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Failed to update user');
                }
            }
        }
    }
];

module.exports = routes;