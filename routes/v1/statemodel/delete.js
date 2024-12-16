const routes = [
  {
    method: 'DELETE',
    path: '/{itemId}/statemodel',
    options: {
      auth: {
        strategy: 'jwt_strategy',
        scope: ['admin']
      },
      description: 'Delete state model',
      notes: 'Deletes the state model for a specific item',
      tags: ['api', 'statemodel', 'v1'],
      handler: (request, h) => {
        return {
          status: 'success',
          message: `State model deleted successfully for item ${request.params.itemId}`
        };
      }
    }
  }
];

module.exports = routes; 