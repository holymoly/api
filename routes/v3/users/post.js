const routes = [
  {
    method: 'POST',
    path: '/',
    options: {
      auth:{
        strategy: 'jwt_strategy',
        scope: ['admin'] // must be defined in jwt und scope -> see also jwt_strategy
      }, // admin only
      description: 'Create User',
      notes: 'Creates a new user',
      tags: ['api', 'users','v1'],
      handler: (request, h) => {
        // Logic to create a user
        return 'User created';
      }
    }
  }
];

module.exports = routes;