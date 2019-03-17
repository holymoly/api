'use strict';

// mariaDb
const mariadb = require('../../../mariadb/mariadb');

// Load query
const query = require('../../../mariadb/query');

// Load logger
const logger = require('../../../logger/logger').logRoutes;

//password handling
const auth = require('../../auth');

// localhost:8000/
const get_root = (request, reply) => {
  replyToClient(undefined, reply, 'welcome to the root');
}

// localhost:8000/login
const get_login = (request, reply) => {
  replyToClient(undefined, reply, {
    authenticated: true
  });
}

// localhost:8000/hello/{id}
const get_hello_id = (request, reply) => {
  replyToClient(undefined, reply, 'hello id: ' + request.params.id);
}

// localhost:8000/databases
const get_databases = (request, reply) => {
  mariadb.query(query.databases, '', (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/users
const post_user = (request, reply) => {
  var data = request.payload;
  logger.debug('Create user with data: ' + JSON.stringify(data));

  // generate salt and hash
  auth.generateSalt(data.password)
    .then(auth.hashPassword)
    .then(function(result) {
      data.hash = result.hash;
      logger.debug('Created hash: ' + JSON.stringify(data));
      return mariadb.query(query.createUser, data, (err, result) => {
        replyToClient(err, reply, result);
      });
    })
    .catch(function(err) {
      replyToClient(err, reply, 'cannot hash password');
    });
}

// localhost:8000/users
const get_users = (request, reply) => {
  mariadb.query(query.getUsers, request.payload, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/user
const get_user_email = (request, reply) => {
  mariadb.query(query.getUserFilterEmail, request.query, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/user
const get_user_userId = (request, reply) => {
  mariadb.query(query.getUserFilterUserId, request.query, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/user
const del_user = (request, reply) => {
  mariadb.query(query.deleteUser, request.query, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/ipc/{rec_module}
const post_ipc = (request, reply) => {
  logger.debug(request);
  replyToClient(undefined, reply, "generic response");
}

// Helper function for reply
function replyToClient(err, reply, data) {
  if (err) {
    logger.error('Reply Error:' + err);
    return reply(err);
  } else {
    logger.debug('Reply: ' + data);
    return reply(data);
  }
};

module.exports = {
  get_root,
  get_login,
  get_hello_id,
  get_databases,
  post_user,
  get_users,
  get_user_email,
  get_user_userId,
  del_user,
  post_ipc
};