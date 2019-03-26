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
const get_root = (request, h) => {
  return replyToClient(undefined, 'welcome to the root');
}

// localhost:8000/login
const get_login = (request, h) => {
  return replyToClient(undefined, {
    authenticated: true
  });
}

// localhost:8000/hello/{id}
const get_hello_id = (request, h) => {
  return replyToClient(undefined, 'hello id: ' + request.params.id);
}

// localhost:8000/databases
const get_databases = (request, h) => {
  var result = mariadb.query(query.databases,'');
  return replyToClient(undefined,result);
  /*
  mariadb.query(query.databases, '', (err, result) => {
    return replyToClient(err, result);
  });
  */
}

// localhost:8000/users
const post_user = (request, h) => {
  var data = request.payload;
  logger.debug('Create user with data: ' + JSON.stringify(data));

  // generate salt and hash
  auth.generateSalt(data.password)
    .then(auth.hashPassword)
    .then(function(result) {
      data.hash = result.hash;
      logger.debug('Created hash: ' + JSON.stringify(data));
      var result = mariadb.query(query.databases,'');
      return replyToClient(undefined,result);
      /*
      return mariadb.query(query.createUser, data, (err, result) => {
         return replyToClient(err, result);
      });
      */
    })
    .catch(function(err) {
      return replyToClient(err,'cannot hash password');
    });
}

// localhost:8000/users
const get_users = (request, h) => {
  var result = mariadb.query(query.databases,'');
  return replyToClient(undefined,result);
  /*
  mariadb.query(query.getUsers, request.payload, (err, result) => {
    return replyToClient(err, result);
  });
  */
}

// localhost:8000/user
const get_user_email = (request, h) => {
  var result = mariadb.query(query.databases,'');
  return replyToClient(undefined,result);
  /*
  mariadb.query(query.getUserFilterEmail, request.query, (err, result) => {
    return replyToClient(err, result);
  });
  */
}

// localhost:8000/user
const get_user_userId = (request, h) => {
  var result = mariadb.query(query.databases,'');
  return replyToClient(undefined,result);
  /*
  mariadb.query(query.getUserFilterUserId, request.query, (err, result) => {
    return replyToClient(err, result);
  });
  */
}

// localhost:8000/user
const del_user = (request, h) => {
  var result = mariadb.query(query.databases,'');
  return replyToClient(undefined,result);
  /*
  mariadb.query(query.deleteUser, request.query, (err, result) => {
    return replyToClient(err, result);
  });
  */
}

// localhost:8000/ipc/{rec_module}
const post_ipc = (request, h) => {
  var data = request.payload;
  logger.debug("IPC message for module " + request.params.rec_module + ": " + JSON.stringify(data))
  return replyToClient(undefined, "generic response");
}

// Helper function for reply
function replyToClient(err, data) {
  if (err) {
    logger.error('Reply Error:' + err);
    return err;
  } else {
    logger.debug('Reply: ' + data);
    return data;
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
