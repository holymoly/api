const routes = [
  {
    method: 'PUT',
    path: '/',
    options: {
      auth:{
        strategy: 'jwt_strategy',
        scope: ['admin'] // must be defined in jwt und scope -> see also jwt_strategy
      }, // admin only
      description: 'Update User',
      notes: 'Updates an existing user',
      tags: ['api', 'users', 'v1'],
      handler: (request, h) => {
        // Logic to update a user
        return 'User updated';
      }
    }
  }
];

module.exports = routes;