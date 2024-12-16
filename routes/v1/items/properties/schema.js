const Joi = require('joi');

const schemas = {
    params: {
        itemId: Joi.object({
            itemId: Joi.number().required().description('ID of the item')
        }).unknown(),
        propertyId: Joi.object({
            itemId: Joi.number().required().description('ID of the item'),
            propertyId: Joi.number().required().description('ID of the property')
        }).unknown()
    },
    payload: {
        create: Joi.object({
            propertyId: Joi.number().required().description('ID of the property definition'),
            value: Joi.any().required().description('Value of the property')
        }).label('CreateItemPropertyPayload'),
        update: Joi.object({
            value: Joi.any().required().description('New value of the property')
        }).label('UpdateItemPropertyPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                itemId: Joi.number().required(),
                propertyId: Joi.number().required(),
                propertyName: Joi.string().required(),
                type: Joi.string().required(),
                value: Joi.any().required(),
                uom: Joi.string().allow(null),
                lastUpdated: Joi.date().iso().required()
            })
        }).label('ItemPropertyResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                itemId: Joi.number().required(),
                propertyId: Joi.number().required(),
                propertyName: Joi.string().required(),
                type: Joi.string().required(),
                value: Joi.any().required(),
                uom: Joi.string().allow(null),
                lastUpdated: Joi.date().iso().required()
            }))
        }).label('ItemPropertyListResponse'),
        history: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                itemId: Joi.number().required(),
                propertyId: Joi.number().required(),
                value: Joi.any().required(),
                timestamp: Joi.date().iso().required(),
                updatedBy: Joi.string().required()
            }))
        }).label('ItemPropertyHistoryResponse')
    }
};

module.exports = schemas; 