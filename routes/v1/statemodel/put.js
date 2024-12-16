const routes = [
  {
    method: 'PUT',
    path: '/{itemId}/statemodel',
    options: {
      auth: {
        strategy: 'jwt_strategy',
        scope: ['admin']
      },
      description: 'Update state model',
      notes: 'Updates the state model for a specific item',
      tags: ['api', 'statemodel', 'v1'],
      handler: (request, h) => {
        return {
          status: 'success',
          message: 'State model updated successfully',
          data: {
            itemId: request.params.itemId,
            ...request.payload
          }
        };
      }
    }
  },
  {
    method: 'PUT',
    path: '/{itemId}/statemodel/state',
    options: {
      auth: {
        strategy: 'jwt_strategy',
        scope: ['admin']
      },
      description: 'Update item state',
      notes: 'Updates the current state of an item',
      tags: ['api', 'statemodel', 'v1'],
      handler: (request, h) => {
        return {
          status: 'success',
          message: 'Item state updated successfully',
          data: {
            itemId: request.params.itemId,
            newState: request.payload.state
          }
        };
      }
    }
  }
];

module.exports = routes; 