'use strict';

const item_admin = {
  strategy: 'session',
  scope: ['isadmin'] // admin only
}

const item_guest = {
  strategy: 'session',
  scope: ['isguest', 'isadmin'] // admin only
}


// localhost:8000/ipc
const ipc = {
  strategy: 'session',
  scope: ['isadmin'] // admin only
}

module.exports = {
  item_admin,
  item_guest,
  ipc
};