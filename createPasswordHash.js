// crypto lib
const Bcrypt = require('bcrypt');

function generateSalt() {
  return new Promise(function(resolve, reject) {
    Bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        console.log('Error requesting hash: ' + err);
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
        console.log('Error requesting hash: ' + err);
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

var password = "test";

Bcrypt.genSalt(10, function(err, salt) {
  console.log("salt: " + salt);
  Bcrypt.hash(password, salt, function(err, hash) {
    console.log("hash: " + hash);
  });
});
