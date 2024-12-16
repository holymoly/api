const Joi = require('joi');

const schemas = {
    params: {
        classId: Joi.object({
            classId: Joi.number().required().description('ID of the item class')
        }),
        stateModelId: Joi.object({
            classId: Joi.number().required().description('ID of the item class'),
            stateModelId: Joi.number().required().description('ID of the state model')
        })
    },
    payload: {
        create: Joi.object({
            name: Joi.string().required().description('Name of the state model'),
            description: Joi.string().optional().description('Description of the state model'),
            initialStateId: Joi.number().optional().description('ID of the initial state'),
            states: Joi.array().items(Joi.object({
                name: Joi.string().required().description('Name of the state'),
                description: Joi.string().optional().description('Description of the state'),
                isInitial: Joi.boolean().default(false).description('Whether this is the initial state'),
                isFinal: Joi.boolean().default(false).description('Whether this is a final state')
            })).optional().description('Initial states to create with the model')
        }).label('CreateStateModelPayload'),
        update: Joi.object({
            name: Joi.string().optional().description('Name of the state model'),
            description: Joi.string().optional().description('Description of the state model'),
            initialStateId: Joi.number().optional().description('ID of the initial state')
        }).label('UpdateStateModelPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                stateModelId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                initialStateId: Joi.number().allow(null),
                states: Joi.array().items(Joi.object({
                    stateId: Joi.number().required(),
                    name: Joi.string().required(),
                    description: Joi.string().allow(null),
                    isInitial: Joi.boolean().required(),
                    isFinal: Joi.boolean().required()
                }))
            })
        }).label('StateModelResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                stateModelId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                initialStateId: Joi.number().allow(null),
                stateCount: Joi.number().required()
            }))
        }).label('StateModelListResponse')
    }
};

module.exports = schemas; 