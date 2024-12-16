const Joi = require('joi');

const schemas = {
    params: {
        classId: Joi.object({
            classId: Joi.number().required().description('ID of the item class')
        }).unknown()
    },
    payload: {
        create: Joi.object({
            name: Joi.string().required().description('Name of the item class'),
            description: Joi.string().optional().description('Description of the item class'),
            type: Joi.string().required().valid('Equipment', 'Material', 'Tool').description('Type of the item class')
        }).label('CreateItemClassPayload'),
        update: Joi.object({
            name: Joi.string().optional().description('Name of the item class'),
            description: Joi.string().optional().description('Description of the item class'),
            type: Joi.string().optional().valid('Equipment', 'Material', 'Tool').description('Type of the item class')
        }).label('UpdateItemClassPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                itemClassId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                type: Joi.string().required()
            })
        }).label('ItemClassResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                itemClassId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                type: Joi.string().required()
            }))
        }).label('ItemClassListResponse'),
        delete: Joi.object({
            status: Joi.string().required().example('success'),
            message: Joi.string().required().example('Item class deleted successfully')
        }).label('DeleteItemClassResponse')
    }
};

module.exports = schemas; 