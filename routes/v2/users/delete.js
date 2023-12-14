const routes = [
  {
    method: 'DELETE',
    path: '/',
    options: {
      auth:{
        strategy: 'jwt_strategy',
        scope: ['admin'] // must be defined in jwt und scope -> see also jwt_strategy
      }, // admin only
      description: 'Delete User',
      notes: 'Deletes a user',
      tags: ['api', 'users', 'v2'],
      handler: (request, h) => {
        // Logic to delete a user
        return 'User deleted';
      }
    }
  }
];

module.exports = routes;