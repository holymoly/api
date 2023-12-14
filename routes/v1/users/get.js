const routes = [
  {
    method: 'GET',
    path: '/',
    options: {
      auth:{
        strategy: 'jwt_strategy',
        scope: ['admin'] // must be defined in jwt und scope -> see also jwt_strategy
      }, // admin only
      description: 'Get Users',
      notes: 'Returns a list of users',
      tags: ['api', 'users', 'v1'],
      handler: (request, h) => {
        // Logic to retrieve users
        return 'List of users';
      }
    }
  }
];

module.exports = routes;