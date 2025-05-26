const Joi = require('joi');

const schemas = {
    params: {
        userId: Joi.object({
            userId: Joi.string().guid().required().description('UUID of the user')
        }),
        username: Joi.object({
            username: Joi.string().required().description('Username of the user')
        })
    },
    payload: {
        create: Joi.object({
            username: Joi.string().required().min(3).max(30)
                .description('Username for login'),
            password: Joi.string().required().min(8)
                .description('Password'),
            role: Joi.string().valid('admin', 'user').default('user')
                .description('User role')
        }).label('CreateUserPayload'),
        update: Joi.object({
            username: Joi.string().optional()
                .description('Username'),
            role: Joi.string().valid('admin', 'user').optional()
                .description('User role'),
            is_active: Joi.boolean().optional()
                .description('User account status')
        }).label('UpdateUserPayload'),
        login: Joi.object({
            username: Joi.string().required()
                .description('Username'),
            password: Joi.string().required()
                .description('Password')
        }).label('LoginPayload'),
        changePassword: Joi.object({
            currentPassword: Joi.string().required()
                .description('Current password'),
            newPassword: Joi.string().required().min(8)
                .description('New password'),
            confirmPassword: Joi.string().required().valid(Joi.ref('newPassword'))
                .description('Confirm new password')
        }).label('ChangePasswordPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                id: Joi.string().guid().required(),
                username: Joi.string().required(),
                role: Joi.string().required(),
                is_active: Joi.boolean().required(),
                created_at: Joi.date().iso().required(),
                updated_at: Joi.date().iso().required(),
                last_login: Joi.date().iso().allow(null)
            })
        }).label('UserResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                id: Joi.string().guid().required(),
                username: Joi.string().required(),
                role: Joi.string().required(),
                is_active: Joi.boolean().required(),
                created_at: Joi.date().iso().required(),
                updated_at: Joi.date().iso().required(),
                last_login: Joi.date().iso().allow(null)
            }))
        }).label('UserListResponse'),
        login: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                token: Joi.string().required(),
                user: Joi.object({
                    id: Joi.string().guid().required(),
                    username: Joi.string().required(),
                    scope: Joi.array().items(Joi.string()).required()
                })
            })
        }).label('LoginResponse')
    }
};

module.exports = schemas; 