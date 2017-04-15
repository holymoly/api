'use strict';

// Load logger
const logger = require('../logger').logRoutes;

// Load sql queries
const handler = require('./config/handler');

// Load auth config
const auth = require('./config/auth');

// Load validation
const validate = require('./config/validate');

// Export all routes to other modules
module.exports = [
  // localhost:8000/
  {
    method: 'GET',
    path:'/',
    config: {
      handler: handler.get_root,
      description: 'answer if root path was called',
      notes: 'Returns "welcome to the root"',
      tags: ['api'], // Tags for swagger
    }
  }

  // localhost:8000/login
  ,{
    method: 'GET',
    path:'/login',
    config: {
      auth: auth.login,
      handler: handler.get_login,
      description: 'Used for initial authentification',
      notes: `Use Basic Authentification with email and password. Returns a
      cookie with the session information on success. Also returns a json with
      authenticate = true/false. Cookie must be used to authenticate against
      routes with Cookie Auth`,
      tags: ['api','auth','scope'], // Tags for swagger
    }
  },

  // localhost:8000/hello/{id}
  {
    method: 'GET',
    path:'/hello/{id}',
    config: {
      handler: handler.get_hello_id,
      auth: auth.hello_id,
      description: 'Get back id',
      notes: 'Returns the passed {id}',
      tags: ['api'], // Tags for swagger
      validate: validate.get_hello_id
    }
  },

  // localhost:8000/databases
  {
    method: 'GET',
    path:'/databases',
    config: {
      handler: handler.get_databases,
      description: 'Get databases',
      notes: 'Returns all databases',
      tags: ['api','database'], // Tags for swagger
    }
  },

  // localhost:8000/users
  {
    method: 'POST',
    path:'/users',
    config: {
      handler: handler.post_user,
      description: 'Create a user',
      notes: 'Creates user, set groups and store hashed password in database',
      tags: ['api', 'database', 'users'], // Tags for swagger
      validate: validate.post_user
    }
  },

  // localhost:8000/users
  {
    method: 'GET',
    path:'/users',
    config: {
      handler: handler.get_users,
      description: 'Returns all users',
      notes: 'Returns array of users',
      tags: ['api', 'database', 'users'], // Tags for swagger
    }
  },

  // localhost:8000/user
  {
    method: 'GET',
    path:'/user/email',
    config: {
      handler: handler.get_user_email,
      description: 'Returns a user filtered by email',
      notes: 'Returns a user filtered by email',
      tags: ['api', 'database', 'users'], // Tags for swagger
      validate: validate.get_user_email
    }
  },

  // localhost:8000/user
  {
    method: 'GET',
    path:'/user/user_id',
    config: {
      handler: handler.get_user_userId,
      description: 'Returns a user filtered by user_id',
      notes: 'Returns a user filtered by user_id',
      tags: ['api', 'database', 'users'], // Tags for swagger
      validate: validate.get_user_userId
    }
  },

  // localhost:8000/user
  {
    method: 'DELETE',
    path:'/user',
    config: {
      handler: handler.del_user,
      description: 'Deletes a user by email',
      notes: 'Deletes a user by email',
      tags: ['api', 'database', 'users'], // Tags for swagger
      validate: validate.del_user
    }
  }
]

