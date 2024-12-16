const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'DELETE',
        path: '/{propertyId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete property',
            notes: 'Deletes a property definition from an item class',
            tags: ['api', 'itemclass', 'properties', 'v1'],
            validate: {
                params: schemas.params.propertyId
            },
            response: {
                schema: schemas.response.delete
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: `Property ${request.params.propertyId} deleted successfully`
                };
            }
        }
    }
];

module.exports = routes; 