# Sample hapi REST Api server
Self teaching hapi

## What it does
  + seperate api versions by url /api/v1/users
  + provides endpoint examples `http://localhost:3000/api/v1/users`
  + uses swagger for api documentation `http://localhost:8000/documentation`
  + swagger documentation grouped by version
  + authentication user jwt token as Bearer token in header
  + jwt token needs to contain the scope (admin, user, guest) for authenticating on endpoint
  + expample provided on how to generate the jwt token 

## What is missing (ToDo)
  + log output seperated by module (auth, routes, db, logger)
  + uses winston for logging
  + use endpoint to query postgres for data
  + https example
  

## Installing

  1. Install [node](https://nodejs.org/en/download/package-manager/)
  2. `git clone https://github.com/holymoly/api`
  3. `cd api && npm install`
  4. `node app.js`
