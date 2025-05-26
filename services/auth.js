const JWT = require('@hapi/jwt');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const users = require('../DBM/users');

const JWT_SECRET = process.env.JWT_SECRET || 'some_shared_secret';

const authService = {
    generateToken: (user) => {
        try {
            const token = JWT.token.generate(
                {
                    sub: 'api-items',
                    scope: user.role, // Use user's role from database
                    user: user.username
                },
                {
                    key: JWT_SECRET,
                    algorithm: 'HS256'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );
            
            return token;
        } catch (error) {
            console.error('Token generation error:', error);
            throw Boom.internal('Error generating token');
        }
    },

    validateCredentials: async (username, password) => {
        try {
            if (!username || !password) {
                throw Boom.badRequest('Missing credentials');
            }

            // Get user from database
            const user = await users.findByUsername(username);
            if (!user) {
                throw Boom.unauthorized('Invalid credentials');
            }

            // Check if user is active
            if (!user.is_active) {
                throw Boom.unauthorized('Account is disabled');
            }

            // Verify password
            const isValid = await bcrypt.compare(password, user.password_hash);
            if (!isValid) {
                throw Boom.unauthorized('Invalid credentials');
            }

            // Update last login time
            await users.updateLastLogin(user.id);

            return {
                id: user.id,
                username: user.username,
                role: user.role,
                scope: [user.role] // Convert role to scope array
            };
        } catch (error) {
            console.error('Validation error:', error);
            if (error.isBoom) {
                throw error;
            }
            throw Boom.internal('Error validating credentials');
        }
    }
};

module.exports = authService; 