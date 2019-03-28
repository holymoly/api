'use strict';

// Get all dbs from mariadb
const databases = 'SHOW DATABASES;';

// Returns all User in Users Table
const getUsers = `SELECT * FROM users;`

// Returns a User filtered by email
var getUserFilterEmail = `SELECT * FROM users WHERE email = :value;`

// Returns a User filtered by user_id
var getUserFilterUserId = `SELECT * FROM users WHERE user_id = :value;`

// Deletes a User by email
var deleteUser = `DELETE FROM users WHERE username = :username;`

// Returns a Hash filtered by email
var getHashByUsername = `SELECT hash FROM passwords WHERE username = :value;`

// Returns a Hash filtered by email
var getUserGroup = `SELECT isGuest,isUser,isAdmin FROM groups WHERE username = :value;`

// Create User
var createUser = `INSERT INTO api.users (firstname, lastname, username, email) VALUE ( :firstname, :lastname, :username, :email);
INSERT INTO api.passwords (hash, username) VALUE (:hash, :username);
INSERT INTO api.groups (username, isGuest, isUser, isAdmin) VALUE (:username, :isGuest, :isUser, :isAdmin);`

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