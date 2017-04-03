'use strict';

// Get all dbs from mariadb
const databases = 'SHOW DATABASES;';

// Creat new User in Users Table
var createUser = `INSERT INTO
    Users (firstname,lastname,username,email)
    VALUES (:firstname,:lastname,:username,:email);`

// Returns all User in Users Table
const getUsers = `SELECT * FROM users;`

// Returns a User filtered by email
var getUserFilterEmail = `SELECT * FROM users WHERE email = :value;`

// Returns a User filtered by user_id
var getUserFilterUserId = `SELECT * FROM users WHERE user_id = :value;`

// Deletes a User by email
var deleteUser = `DELETE FROM users WHERE email = :email;`

module.exports = {
  databases,
  createUser,
  getUsers,
  getUserFilterEmail,
  getUserFilterUserId,
  deleteUser
};
