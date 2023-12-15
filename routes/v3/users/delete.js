const routes = [
  {
    method: 'DELETE',
    path: '/',
    options: {
      auth:{
        strategy: 'jwt_strategy',
        scope: ['admin'] // must be defined in jwt using the scope key<-> see also jwt_strategy
      }, // admin only
      description: 'Delete User',
      notes: 'Deletes a user',
      tags: ['api', 'users', 'v1'],
      handler: (request, h) => {
        // Logic to delete a user
        return 'User deleted';
      }
    }
  }
];

module.exports = routes;