const Joi = require('joi');

const schemas = {
    params: {
        userId: Joi.object({
            userId: Joi.number().required().description('ID of the user')
        }),
        username: Joi.object({
            username: Joi.string().required().description('Username of the user')
        })
    },
    payload: {
        create: Joi.object({
            username: Joi.string().required().min(3).max(30)
                .description('Username for login'),
            email: Joi.string().email().required()
                .description('Email address'),
            password: Joi.string().required().min(8)
                .description('Password'),
            firstName: Joi.string().required()
                .description('First name'),
            lastName: Joi.string().required()
                .description('Last name'),
            role: Joi.string().valid('admin', 'user').default('user')
                .description('User role')
        }).label('CreateUserPayload'),
        update: Joi.object({
            email: Joi.string().email().optional()
                .description('Email address'),
            firstName: Joi.string().optional()
                .description('First name'),
            lastName: Joi.string().optional()
                .description('Last name'),
            role: Joi.string().valid('admin', 'user').optional()
                .description('User role'),
            isActive: Joi.boolean().optional()
                .description('User account status')
        }).label('UpdateUserPayload'),
        login: Joi.object({
            username: Joi.string().required()
                .description('Username or email'),
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
                userId: Joi.number().required(),
                username: Joi.string().required(),
                email: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                role: Joi.string().required(),
                isActive: Joi.boolean().required(),
                createdAt: Joi.date().iso().required(),
                lastLogin: Joi.date().iso().allow(null)
            })
        }).label('UserResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                userId: Joi.number().required(),
                username: Joi.string().required(),
                email: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                role: Joi.string().required(),
                isActive: Joi.boolean().required(),
                lastLogin: Joi.date().iso().allow(null)
            }))
        }).label('UserListResponse'),
        login: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                token: Joi.string().required(),
                user: Joi.object({
                    userId: Joi.number().required(),
                    username: Joi.string().required(),
                    role: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required()
                })
            })
        }).label('LoginResponse')
    }
};

module.exports = schemas; 