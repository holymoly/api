'use strict';

// localhost:8000/hello
const login = {
  strategy: 'simple',
  scope: ['isAdmin', 'isUser'] // admin and user
}

// localhost:8000/hello
const hello_id = {
  strategy: 'session',
  scope: ['isAdmin'] // admin only
}

// localhost:8000/hello
const ipc = {
  strategy: 'session',
  scope: ['isAdmin'] // admin only
}

module.exports = {
  login,
  hello_id,
  ipc
};