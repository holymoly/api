'use strict';

// localhost:8000/login
const login = {
  strategy: 'simple',
  scope: ['isadmin', 'isuser'] // admin and user
}

// localhost:8000/hello
const hello_id = {
  strategy: 'session',
  scope: ['isadmin'] // admin only
}

// localhost:8000/ipc
const ipc = {
  strategy: 'session',
  scope: ['isadmin'] // admin only
}

module.exports = {
  login,
  hello_id,
  ipc
};