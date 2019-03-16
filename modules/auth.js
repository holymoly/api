'use strict';

// crypto lib
const Bcrypt = require('bcrypt');

// Load logger
var logger = require('../modules/logger').logAuth;

// mariaDb
const mariadb = require('./mariadb/mariadb');

// Load sql queries
const queryHashByEmail = require('./mariadb/query').getHashByEmail;

// Load sql queries
const queryGetUserGroup = require('./mariadb/query').getUserGroup;

// Validating function used for Basic Auth
var validate = (request, email, password, callback) => {
  logger.debug('Validation of User: ' + email);

  getHashByEmail(email, password)
    .then(checkPassword)
    .then(getUserGroup)
    .then(function(scope){
      request.cookieAuth.set({ scope: scope});
      callback(undefined, true, { scope: scope});
    })
    .catch(function (reason) {
      callback({ authenticated: false, reason: reason }, false);
    });
};

function getHashByEmail(email, password) {
  return new Promise(function (resolve, reject) {
    mariadb.query( queryHashByEmail, {value: email}, (err, result) => {
      if (err){
        logger.error('Error requesting hash: ' + err);
        reject(err)
      } else {
	logger.debug('Received result: ' +  result);
        if(result[0][0]){
          logger.debug('Received hash: ' + result);
          resolve({
            hash: result[0][0],
            password: password,
            email: email
          })
        }else{
          logger.error('No Hash found');
          reject(err)
        }
      }
    });
  });
}

function checkPassword(data){
  return new Promise(function (resolve, reject) {
    Bcrypt.compare(data.password, data.hash, (err, isValid) => {
      if (err){
        logger.error('Error validating password: ' + err);
        reject(err)
      } else{
        logger.debug(isValid);
        if(isValid){
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
  return new Promise(function (resolve, reject) {
    mariadb.query( queryGetUserGroup, {value: data.email}, (err, result) => {
      if (err){
        logger.error('Error requesting groups: ' + err);
        reject(err)
      } else {
        if(result[0][0]){
          var scope = [];
          if(result[0][0] === 'true'){
            scope.push('guest');
          }
          if(result[0][1] === 'true'){
            scope.push('user');
          }
          if(result[0][2] === 'true'){
             scope.push('admin');
          }
          logger.debug('Received groups: ' + result);
          resolve(scope)
        }else{
          logger.error('No Groups found');
          reject(err)
        }
      }
    });
  });
}


function generateSalt(password) {
  return new Promise(function (resolve, reject) {
    Bcrypt.genSalt(10, function (err, salt){
      if (err){
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
  return new Promise(function (resolve, reject) {
    Bcrypt.hash(data.password, data.salt, function (err, hash){
      if (err){
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
