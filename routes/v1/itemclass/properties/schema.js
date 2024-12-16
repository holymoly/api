const Joi = require('joi');

const schemas = {
    params: {
        classId: Joi.object({
            classId: Joi.number().required().description('ID of the item class')
        }),
        propertyId: Joi.object({
            classId: Joi.number().required().description('ID of the item class'),
            propertyId: Joi.number().required().description('ID of the property')
        })
    },
    payload: {
        create: Joi.object({
            name: Joi.string().required().description('Name of the property'),
            description: Joi.string().optional().description('Description of the property'),
            type: Joi.string().required().valid('string', 'number', 'boolean', 'date')
                .description('Data type of the property'),
            uom: Joi.string().optional().description('Unit of measure')
        }).label('CreatePropertyPayload'),
        update: Joi.object({
            name: Joi.string().optional().description('Name of the property'),
            description: Joi.string().optional().description('Description of the property'),
            type: Joi.string().optional().valid('string', 'number', 'boolean', 'date')
                .description('Data type of the property'),
            uom: Joi.string().optional().description('Unit of measure')
        }).label('UpdatePropertyPayload')
    },
    response: {
        single: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.object({
                propertyId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                type: Joi.string().required(),
                uom: Joi.string().allow(null)
            })
        }).label('PropertyResponse'),
        list: Joi.object({
            status: Joi.string().required().example('success'),
            data: Joi.array().items(Joi.object({
                propertyId: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().allow(null),
                type: Joi.string().required(),
                uom: Joi.string().allow(null)
            }))
        }).label('PropertyListResponse')
    }
};

module.exports = schemas; 