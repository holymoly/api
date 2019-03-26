'use strict';

// crypto lib
const Bcrypt = require('bcrypt');

// Load logger
var logger = require('../logger/logger').logAuth;

// mariaDb
const mariadb = require('../mariadb/mariadb');

// Load sql queries
const queryHashByEmail = require('../mariadb/query').getHashByEmail;

// Load sql queries
const queryGetUserGroup = require('../mariadb/query').getUserGroup;

// Validating function used for Basic Auth
const validate = async(request, email, password, h) => {
  logger.debug('Validation of User: ' + email);
  try{
    const hash  = await getHashByEmail(email, password)
    const isValid = await checkPassword(JSON.stringify(hash[0]), password);
    const groups = await getUserGroup(isValid);
 
    request.cookieAuth.set({
      scope: groups
    });
    return {isValid: isValid, credentials: {scope: groups}};
  } catch(err) {
    return {isValid: false, credentials: {reason: err}};
  };
};

function getHashByEmail(email, password) {
  logger.debug('Check hash');
  try{
    return  mariadb.query(queryHashByEmail, { value: email });
  } catch(err) {
    return (err);
  }
}

function checkPassword(hash, password) {
  logger.debug('Check passord: ' + password + ' ' + hash);
  return new Promise(function(resolve, reject) {
    Bcrypt.compare(password, hash, (err, isValid) => {
      if (err) {
        logger.error('Error validating password: ' + err);
        return reject(err)
      } else {
        logger.debug('Password is valid: ' + isValid);
        if (isValid) {
          logger.debug('Paswword for User was valid: ' + isValid);
          resolve(data)
        } else {
          logger.error('Wrong password');
          reject('Wrong password')
        }
      }
    });
  });
}

function getUserGroup(data) {
  return new Promise(function(resolve, reject) {
    mariadb.query(queryGetUserGroup, {
      value: data.email
    }, (err, result) => {
      if (err) {
        logger.error('Error requesting groups: ' + err);
        reject(err)
      } else {
        if (result[0][0]) {
          var scope = [];
          if (result[0][0] === 'true') {
            scope.push('guest');
          }
          if (result[0][1] === 'true') {
            scope.push('user');
          }
          if (result[0][2] === 'true') {
            scope.push('admin');
          }
          logger.debug('Received groups: ' + result);
          resolve(scope)
        } else {
          logger.error('No Groups found');
          reject(err)
        }
      }
    });
  });
}


function generateSalt(password) {
  return new Promise(function(resolve, reject) {
    Bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        logger.error('Error requesting hash: ' + err);
        reject(err)
      } else {
        resolve({
          salt: salt,
          password: password
        })
      }
    });
  });
}

function hashPassword(data) {
  return new Promise(function(resolve, reject) {
    Bcrypt.hash(data.password, data.salt, function(err, hash) {
      if (err) {
        logger.error('Error requesting hash: ' + err);
        reject(err)
      } else {
        resolve({
          hash: hash
        })
      }
    });
  });
}

module.exports = {
  validate,
  generateSalt,
  hashPassword
};
