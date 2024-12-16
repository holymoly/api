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
        stateId: Joi.object({
            classId: Joi.number().required().description('ID of the item class'),
            stateModelId: Joi.number().required().description('ID of the state model'),
            stateId: Joi.number().required().description('ID of the state')
        })
    },
    payload: {
        create: Joi.object({
            name: Joi.string().required().description('Name of the state'),
            description: Joi.string().optional().description('Description of the state'),
            isInitial: Joi.boolean().default(false).description('Whether this is the initial state'),
            isFinal: Joi.boolean().default(false).description('Whether this is a final state'),
            metadata: Joi.object({
                color: Joi.string().optional().description('Color code for UI representation'),
                icon: Joi.string().optional().description('Icon identifier for UI representation')
            }).optional().description('Additional metadata for the state')
        }).label('CreateStatePayload'),
        update: Joi.object({
            name: Joi.string().optional().description('Name of the state'),
            description: Joi.string().optional().description('Description of the state'),
            isInitial: Joi.boolean().optional().description('Whether this is the initial state'),
            isFinal: Joi.boolean().optional().description('Whether this is a final state'),
            metadata: Joi.object({
                color: Joi.string().optional().description('Color code for UI representation'),
                icon: Joi.string().optional().description('Icon identifier for UI representation')
            }).optional().description('Additional metadata for the state')
        }).label('UpdateStatePayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                stateId: Joi.number().required(),
                stateModelId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                isInitial: Joi.boolean().required(),
                isFinal: Joi.boolean().required(),
                metadata: Joi.object({
                    color: Joi.string().allow(null),
                    icon: Joi.string().allow(null)
                }).allow(null),
                allowedTransitions: Joi.array().items(Joi.object({
                    transitionId: Joi.number().required(),
                    toStateId: Joi.number().required(),
                    toStateName: Joi.string().required()
                }))
            })
        }).label('StateResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                stateId: Joi.number().required(),
                stateModelId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                isInitial: Joi.boolean().required(),
                isFinal: Joi.boolean().required(),
                metadata: Joi.object({
                    color: Joi.string().allow(null),
                    icon: Joi.string().allow(null)
                }).allow(null)
            }))
        }).label('StateListResponse')
    }
};

module.exports = schemas; 