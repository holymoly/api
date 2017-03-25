# Sample hapi REST Api server
Self teaching hapi

## What it does
  + query mariadb for existing databases `http://localhost:8000/databases`
  + uses winston for logging
  + log output seperated by module
  + basic authentication on `http://localhost:8000/hello` the rest is  without
  + provides a route `http://localhost:8000/hello/{id}`
  + replys with `hello id: 42` where 42 ist the {id}
  + uses swagger for api documentation `http://localhost:8000/documentation`
  + uses joi to verify {id} is a number
  + seperates routes in a file `/modules/routes.js`
  + seperates plugin in a file `/pugins/plugins.js`
  + swagger documentation grouped by tag

## What is missing (ToDo)

  + seperate handlers from routes
  + ~~more routes~~
  + ~~authentication~~
  + ~~routes with and without authentication~~
  + using https (because its 2017!)
  + ~~database example~~
  + automated testing
  + nginx as loadbalancer
  + example for multiple instances

## Installing

  1. Install [node](https://nodejs.org/en/download/package-manager/)
  2. `git clone https://github.com/holymoly/api`
  3. `cd api && npm install`
  4. `node app.js`
  5. Open <http://localhost:8000/hello/42> in your browser
  6. Open <http://localhost:8000/documentation> in your browser
