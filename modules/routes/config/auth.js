'use strict';

// localhost:8000/hello
const login = {
  strategy: 'simple',
  scope: ['admin','user'] // admin only
}

// localhost:8000/hello
const hello_id = {
  strategy: 'session',
  scope: ['admin'] // admin only
}

module.exports = {
  login,
  hello_id
};
