'use strict';

const jwt = require('jsonwebtoken');

function createToken(user) {
  // Sign the JWT
  console.log( jwt.sign({  sub: "api-items", name: user, scope: 'admin' }, "some_shared_secret", { algorithm: 'HS256', expiresIn: "1h" } ));
}

createToken('holymoly');