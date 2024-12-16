const JWT = require('@hapi/jwt');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const JWT_SECRET = process.env.JWT_SECRET || 'some_shared_secret';

const authService = {
    generateToken: (user) => {
        try {
            const token = JWT.token.generate(
                {
                    sub: 'api-items',
                    scope: 'admin',
                    user: 'holymoly'
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
            // Mock user - replace with database lookup
            const user = {
                id: 1,
                username: 'admin',
                password: await bcrypt.hash('password', 10), // Generate fresh hash
                scope: ['admin']
            };

            if (!username || !password) {
                throw Boom.badRequest('Missing credentials');
            }

            if (username === user.username) {
                const isValid = await bcrypt.compare(password, user.password);
                if (isValid) {
                    return user;
                }
            }
            throw Boom.unauthorized('Invalid credentials');
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