const Joi = require('joi');

const schemas = {
    params: {
        classId: Joi.object({
            classId: Joi.number().required().description('ID of the item class')
        }),
        stateModelId: Joi.object({
            classId: Joi.number().required().description('ID of the item class'),
            stateModelId: Joi.number().required().description('ID of the state model')
        }),
        transitionId: Joi.object({
            classId: Joi.number().required().description('ID of the item class'),
            stateModelId: Joi.number().required().description('ID of the state model'),
            transitionId: Joi.number().required().description('ID of the transition')
        })
    },
    payload: {
        create: Joi.object({
            fromStateId: Joi.number().required().description('Source state ID'),
            toStateId: Joi.number().required().description('Target state ID'),
            name: Joi.string().required().description('Name of the transition'),
            description: Joi.string().optional().description('Description of the transition'),
            validation: Joi.object({
                requiredProperties: Joi.array().items(Joi.number())
                    .description('Property IDs that must be set before transition'),
                conditions: Joi.array().items(Joi.object({
                    propertyId: Joi.number().required(),
                    operator: Joi.string().valid('eq', 'ne', 'gt', 'lt', 'gte', 'lte').required(),
                    value: Joi.any().required()
                })).description('Conditions that must be met for transition')
            }).optional().description('Validation rules for the transition')
        }).label('CreateTransitionPayload'),
        update: Joi.object({
            name: Joi.string().optional().description('Name of the transition'),
            description: Joi.string().optional().description('Description of the transition'),
            validation: Joi.object({
                requiredProperties: Joi.array().items(Joi.number())
                    .description('Property IDs that must be set before transition'),
                conditions: Joi.array().items(Joi.object({
                    propertyId: Joi.number().required(),
                    operator: Joi.string().valid('eq', 'ne', 'gt', 'lt', 'gte', 'lte').required(),
                    value: Joi.any().required()
                })).description('Conditions that must be met for transition')
            }).optional().description('Validation rules for the transition')
        }).label('UpdateTransitionPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                transitionId: Joi.number().required(),
                stateModelId: Joi.number().required(),
                fromStateId: Joi.number().required(),
                fromStateName: Joi.string().required(),
                toStateId: Joi.number().required(),
                toStateName: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                validation: Joi.object({
                    requiredProperties: Joi.array().items(Joi.object({
                        propertyId: Joi.number().required(),
                        name: Joi.string().required()
                    })),
                    conditions: Joi.array().items(Joi.object({
                        propertyId: Joi.number().required(),
                        propertyName: Joi.string().required(),
                        operator: Joi.string().required(),
                        value: Joi.any().required()
                    }))
                }).allow(null)
            })
        }).label('TransitionResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                transitionId: Joi.number().required(),
                stateModelId: Joi.number().required(),
                fromStateId: Joi.number().required(),
                fromStateName: Joi.string().required(),
                toStateId: Joi.number().required(),
                toStateName: Joi.string().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null)
            }))
        }).label('TransitionListResponse')
    }
};

module.exports = schemas;