'use strict';

// crypto lib
const Bcrypt = require('bcrypt');

// Load logger
var logger = require('../logger/logger').logAuth;

// mariaDb
const mariadb = require('../mariadb/mariadb');

// Load sql queries
const queryHashByUsername = require('../mariadb/query').getHashByUsername;

// Load sql queries
const queryGetUserGroup = require('../mariadb/query').getUserGroup;

// Validating function used for Basic Auth
const validate = async(request, username, password, h) => {
  logger.debug('Validation of User: ' + username);
  try {
    const hash = await getHashByUsername(username, password);
    const isValid = await checkPassword(hash, password);
    const groups = await getUserGroup(username);

    request.cookieAuth.set({
      scope: groups
    });
    return {
      isValid: isValid,
      credentials: {
        scope: groups
      }
    };
  } catch (err) {
    return {
      isValid: false,
      credentials: {
        reason: err
      }
    };
  };
};

async function getHashByUsername(username) {
  logger.debug('Check hash for user:' + username);
  try {
    var result = await mariadb.query(queryHashByUsername, {
      value: username
    });
    return result[0]['hash'];
  } catch (err) {
    return (err);
  }
}

function checkPassword(hash, password) {
  return new Promise(function(resolve, reject) {
    logger.debug('Password, hash: ' + password + ' : ' + hash);
    Bcrypt.compare(password, hash, (err, isValid) => {
      if (err) {
        logger.error('Error validating password: ' + err);
        return reject(err)
      } else {
        if (isValid) {
          logger.debug('Paswword for User was valid: ' + isValid);
          resolve(isValid)
        } else {
          logger.error('Wrong password');
          reject('Wrong password')
        }
      }
    });
  });
}

async function getUserGroup(username) {
  try {
    var result = await mariadb.query(queryGetUserGroup, {
      value: username
    });
    logger.debug(JSON.stringify(result));
    return await checkScope(result);
  } catch (err) {
    logger.error(err);
    return err;
  }

  async function checkScope(data) {
    return new Promise(function(resolve, reject) {
      var scope = [];
      logger.debug(JSON.stringify(data[0]));

      for (var key in data[0]) {
        if (data[0].hasOwnProperty(key)) {
          if (data[0][key] === "1") {
            scope.push(key);
          }
        }
      }
      resolve(scope);
    });
  };
}

function generateSalt() {
  return new Promise(function(resolve, reject) {
    Bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        logger.error('Error requesting hash: ' + err);
        reject([
          err,
          undefined
        ])
      } else {
        resolve([
          undefined,
          salt
        ])
      }
    });
  });
}

function hashPassword(password, salt) {
  return new Promise(function(resolve, reject) {
    Bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        logger.error('Error requesting hash: ' + err);
        reject([
          err,
          undefined
        ])
      } else {
        resolve([
          undefined,
          hash
        ])
      }
    });
  });
}

function errorHandling(reason) {
  logger.error(reason);
  replyToClient(reason, undefined);
};

module.exports = {
  validate,
  generateSalt,
  hashPassword
};