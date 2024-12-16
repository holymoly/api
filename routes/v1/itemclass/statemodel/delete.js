const schemas = require('./schema');
const Joi = require('joi');

const routes = [
    {
        method: 'DELETE',
        path: '/{classId}/statemodel',
        options: {
            auth: {
                strategy: 'jwt_strategy',
                scope: ['admin']
            },
            description: 'Delete state model',
            notes: 'Deletes the state model from an item class',
            tags: ['api', 'itemclass', 'statemodel', 'v1'],
            validate: {
                params: schemas.params.classId
            },
            response: {
                schema: schemas.response.delete
            },
            handler: async (request, h) => {
                return {
                    status: 'success',
                    message: `State model for item class ${request.params.classId} deleted successfully`
                };
            }
        }
    }
];

module.exports = routes; 