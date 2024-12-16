const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'DELETE',
        path: '/{itemId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete item',
            notes: 'Deletes an existing item',
            tags: ['api', 'items', 'v1'],
            validate: {
                params: schemas.params.itemId
            },
            response: {
                schema: Joi.object({
                    status: Joi.string().required().example('success'),
                    message: Joi.string().required().example('Item deleted successfully')
                }).label('DeleteItemResponse')
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: `Item ${request.params.itemId} deleted successfully`
                };
            }
        }
    }
];

module.exports = routes;
