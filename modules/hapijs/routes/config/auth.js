'use strict';

const item_admin = {
  strategy: 'jwt_strategy',
  scope: ['admin'] // admin only
}

const item_guest = {
  strategy: 'jwt_strategy',
  scope: ['guest', 'admin'] // admin only
}


// localhost:8000/ipc
const ipc = {
  strategy: 'jwt_strategy',
  scope: ['admin'] // admin only
}

module.exports = {
  item_admin,
  item_guest,
  ipc
};
