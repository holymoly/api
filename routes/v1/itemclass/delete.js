const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'DELETE',
        path: '/{classId}',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete item class',
            notes: 'Deletes an existing item class definition',
            tags: ['api', 'itemclass', 'v1'],
            validate: {
                params: schemas.params.classId
            },
            response: {
                schema: schemas.response.delete
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: `Item class ${request.params.classId} deleted successfully`
                };
            }
        }
    }
];

module.exports = routes; 