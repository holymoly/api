const Joi = require('joi');

const schemas = {
    params: {
        itemId: Joi.object({
            itemId: Joi.number().required().description('ID of the item')
        })
    },
    payload: {
        create: Joi.object({
            name: Joi.string().required().description('Name of the item'),
            description: Joi.string().optional().description('Description of the item'),
            itemClassId: Joi.number().required().description('ID of the item class'),
            properties: Joi.object().pattern(
                Joi.number(), // propertyId as key
                Joi.any() // property value can be any type
            ).optional().description('Initial property values')
        }).label('CreateItemPayload'),
        update: Joi.object({
            name: Joi.string().optional().description('Name of the item'),
            description: Joi.string().optional().description('Description of the item')
        }).label('UpdateItemPayload'),
        bulk: Joi.array().items(Joi.object({
            name: Joi.string().required().description('Name of the item'),
            description: Joi.string().optional().description('Description of the item'),
            itemClassId: Joi.number().required().description('ID of the item class'),
            properties: Joi.object().pattern(
                Joi.number(),
                Joi.any()
            ).optional().description('Initial property values')
        })).label('BulkCreateItemPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                itemId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                itemClassId: Joi.number().required(),
                itemClassName: Joi.string().required(),
                currentState: Joi.object({
                    stateId: Joi.number().required(),
                    name: Joi.string().required()
                }).allow(null)
            })
        }).label('ItemResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                itemId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                itemClassId: Joi.number().required(),
                itemClassName: Joi.string().required(),
                currentState: Joi.object({
                    stateId: Joi.number().required(),
                    name: Joi.string().required()
                }).allow(null)
            }))
        }).label('ItemListResponse')
    }
};

module.exports = schemas; 