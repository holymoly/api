'use strict';

// mariaDb
const mariadb = require('../../mariadb/mariadb');

// Load query
const query = require('../../mariadb/query');

// Load logger
const logger = require('../../logger').logRoutes;

// localhost:8000/
const get_root = (request, reply) => {
  replyToClient(undefined, reply,'welcome to the root');
}

// localhost:8000/hello
const get_hello = (request, reply) => {
  replyToClient(undefined, reply,'Hi, nice to meet you!');
}

// localhost:8000/hello/{id}
const get_hello_id = (request, reply) => {
  replyToClient(undefined, reply, 'hello id: ' + request.params.id);
}

// localhost:8000/databases
const get_databases = (request, reply) => {
  return mariadb.query(query.databases,'', (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/users
const post_user = (request, reply) => {
  return mariadb.query(query.createUser,request.payload, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/users
const get_users = (request, reply) => {
  return mariadb.query(query.getUsers,request.payload, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/user
const get_user_email = (request, reply) => {
  return mariadb.query(query.getUserFilterEmail,request.query, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/user
const get_user_userId = (request, reply) => {
  return mariadb.query( query.getUserFilterUserId,request.query, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// localhost:8000/user
const del_user = (request, reply) => {
  return mariadb.query( query.deleteUser,request.query, (err, result) => {
    replyToClient(err, reply, result);
  });
}

// Helper function for reply
function replyToClient(err, reply, data){
  if (err) {
    logger.error('Reply Error:'  + err);
    return reply (err);
  } else {
    logger.debug('Reply: ' + data);
    return reply (data);
  }
};

module.exports = {
  get_root,
  get_hello,
  get_hello_id,
  get_databases,
  post_user,
  get_users,
  get_user_email,
  get_user_userId,
  del_user
};
