const Joi = require('joi');

const schemas = {
    params: {
        itemId: Joi.object({
            itemId: Joi.number().required().description('ID of the item')
        })
    },
    payload: {
        transition: Joi.object({
            transitionId: Joi.number().required().description('ID of the state transition to execute'),
            comment: Joi.string().optional().description('Comment about the state change'),
            properties: Joi.object().pattern(
                Joi.number(), // propertyId as key
                Joi.any() // property value
            ).optional().description('Properties to update during transition')
        }).label('ExecuteTransitionPayload'),
        setState: Joi.object({
            stateId: Joi.number().required().description('ID of the target state'),
            comment: Joi.string().optional().description('Comment about the state change'),
            override: Joi.boolean().default(false).description('Override transition validation')
        }).label('SetStatePayload')
    },
    response: {
        current: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                itemId: Joi.number().required(),
                currentState: Joi.object({
                    stateId: Joi.number().required(),
                    name: Joi.string().required(),
                    description: Joi.string().allow(null),
                    enteredAt: Joi.date().iso().required(),
                    enteredBy: Joi.string().required()
                }),
                availableTransitions: Joi.array().items(Joi.object({
                    transitionId: Joi.number().required(),
                    name: Joi.string().required(),
                    description: Joi.string().allow(null),
                    toStateId: Joi.number().required(),
                    toStateName: Joi.string().required(),
                    validation: Joi.object({
                        requiredProperties: Joi.array().items(Joi.object({
                            propertyId: Joi.number().required(),
                            name: Joi.string().required(),
                            isSatisfied: Joi.boolean().required()
                        })),
                        conditions: Joi.array().items(Joi.object({
                            propertyId: Joi.number().required(),
                            propertyName: Joi.string().required(),
                            operator: Joi.string().required(),
                            value: Joi.any().required(),
                            isSatisfied: Joi.boolean().required()
                        }))
                    }).allow(null)
                }))
            })
        }).label('ItemStateResponse'),
        history: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                stateId: Joi.number().required(),
                stateName: Joi.string().required(),
                enteredAt: Joi.date().iso().required(),
                enteredBy: Joi.string().required(),
                exitedAt: Joi.date().iso().allow(null),
                comment: Joi.string().allow(null),
                transitionId: Joi.number().allow(null),
                transitionName: Joi.string().allow(null)
            }))
        }).label('ItemStateHistoryResponse'),
        transition: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                itemId: Joi.number().required(),
                previousState: Joi.object({
                    stateId: Joi.number().required(),
                    name: Joi.string().required()
                }),
                currentState: Joi.object({
                    stateId: Joi.number().required(),
                    name: Joi.string().required()
                }),
                transitionId: Joi.number().required(),
                transitionName: Joi.string().required(),
                timestamp: Joi.date().iso().required(),
                executedBy: Joi.string().required(),
                comment: Joi.string().allow(null)
            })
        }).label('ItemStateTransitionResponse')
    }
};

module.exports = schemas; 