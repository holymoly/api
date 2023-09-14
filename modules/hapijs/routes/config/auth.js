'use strict';

const item_admin = {
  strategy: 'jwt_strategy',
  scope: ['isadmin'] // admin only
}

const item_guest = {
  strategy: 'jwt_strategy',
  scope: ['isguest', 'isadmin'] // guest and higher
}


// localhost:8000/ipc
const ipc = {
  strategy: 'jwt_strategy',
  scope: ['isadmin'] // admin only
}

module.exports = {
  item_admin,
  item_guest,
  ipc
};
