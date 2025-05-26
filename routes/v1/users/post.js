const schemas = require('./schema');
const Joi = require('joi');
const users = require('../../../DBM/users');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

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
                try {
                    const { username, password, role } = request.payload;
                    
                    // Check if username already exists
                    const existingUser = await users.findByUsername(username);
                    if (existingUser) {
                        throw Boom.conflict('Username already exists');
                    }

                    // Hash password
                    const saltRounds = 10;
                    const passwordHash = await bcrypt.hash(password, saltRounds);

                    // Create user
                    const newUser = await users.create(username, passwordHash, role);

                    return {
                        status: 'success',
                        data: newUser
                    };
                } catch (error) {
                    console.error('Error creating user:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Failed to create user');
                }
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
                try {
                    const { currentPassword, newPassword } = request.payload;
                    const userId = request.auth.credentials.id;

                    // Get user
                    const user = await users.findById(userId);
                    if (!user) {
                        throw Boom.notFound('User not found');
                    }

                    // Verify current password
                    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
                    if (!isValid) {
                        throw Boom.unauthorized('Current password is incorrect');
                    }

                    // Hash new password
                    const saltRounds = 10;
                    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

                    // Update password
                    await users.update(userId, { password_hash: newPasswordHash });

                    return {
                        status: 'success',
                        message: 'Password changed successfully'
                    };
                } catch (error) {
                    console.error('Error changing password:', error);
                    if (error.isBoom) {
                        throw error;
                    }
                    throw Boom.internal('Failed to change password');
                }
            }
        }
    }
];

module.exports = routes;