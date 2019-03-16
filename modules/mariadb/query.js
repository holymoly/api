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
var deleteUser = `DELETE FROM users WHERE email = :email;`

// Returns a Hash filtered by email
var getHashByEmail = `SELECT hash FROM passwords WHERE email = :value;`

// Returns a Hash filtered by email
var getUserGroup = `SELECT isGuest,isUser,isAdmin FROM groups WHERE email = :value;`

// Create User
var createUser = `INSERT INTO users (firstname, lastname, username, email) VALUE ( :firstname, :lastname, :username, :email);
INSERT INTO passwords (hash, email) VALUE (:hash, :email);
INSERT INTO groups (email, isGuest, isUser, isAdmin) VALUE (:email, :isGuest, :isUser, :isAdmin);`

module.exports = {
  databases,
  createUser,
  getUsers,
  getUserFilterEmail,
  getUserFilterUserId,
  deleteUser,
  getHashByEmail,
  getUserGroup
};
