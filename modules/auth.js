'use strict';

const Bcrypt = require('bcrypt');

//Load logger
var logger = require('../modules/logger').logAuth;

// User for testing
const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a',
    scope: 'admin'
  }
};

// Validating function used for Basic Auth
var validate = (request, username, password, callback) => {
  logger.debug('Validation of User: ' + username);

  const user = users[username]; // get user information for validation
  if (!user) {
    logger.error('User: ' + username + 'does not exists');
    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, (err, isValid) => {
    logger.debug('Paswword for User was valid: ' + isValid);
    // Set cookie
    request.cookieAuth.set({ id: user.id, name: user.name, scope: user.scope });
    callback(err, isValid, { id: user.id, name: user.name, scope: user.scope });
  });
};

module.exports = {
  validate,
};
