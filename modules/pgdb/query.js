'use strict';

// Get all dbs from pgdb
const databases = {
  query: 'SELECT datname FROM pg_database;',
  parameters: []
}

// Returns all User in Users Table
const getUsers = {
  query: 'SELECT * FROM api.users;',
  parameters: []
}

// Returns a User filtered by email
var getUserFilterEmail = {
  query: `SELECT * FROM api.users WHERE email = $1;`,
  parameters: []
}

// Returns a User filtered by user_id
var getUserFilterUserId = {
  query: `SELECT * FROM api.users WHERE user_id = $1;`,
  parameters: []
}

// Deletes a User by email
var deleteUser = {
  query: `DELETE FROM api.users  WHERE api.users.username like $1;`,
  parameters: []
}

// Returns a Hash filtered by email
var getHashByUsername = {
  query: `SELECT hash FROM api.passwords WHERE username like $1;`,
  parameters: []
}

// Returns a Hash filtered by email
var getUserGroup = {
  query: `SELECT isGuest,isUser,isAdmin FROM api.groups WHERE username = $1;`,
  parameters: []
}

// Create User -> use transactional secure
var createUser = {
  queries: [{
    query: "INSERT INTO api.users (firstname, lastname, username, email) VALUES ( $1, $2, $3, $4);",
    parameters: []
  }, {
    query: "INSERT INTO api.passwords (hash, username) VALUES ($1, $2);",
    parameters: []
  }, {
    query: "INSERT INTO api.groups (username, isGuest, isUser, isAdmin) VALUES ($1, $2, $3, $4);",
    parameters: []
  }]
}

module.exports = {
  databases,
  createUser,
  getUsers,
  getUserFilterEmail,
  getUserFilterUserId,
  deleteUser,
  getHashByUsername,
  getUserGroup
};
