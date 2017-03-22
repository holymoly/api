# Sample hapi REST Api server

## What it does

  + provides a route `http://localhost:8000/hello/{id}`
  + replys with `hello id: 42` where 42 ist the {id}
  + uses swagger for api documentation `http://localhost:8000/documentation`
  + uses joi to verify {id} is a number
  + seperates routes in a file `/modules/routes.js`
  + seperates plugin in a file `/pugins/plugins.js`

## What is missing (ToDo)

  + ~~more routes~~
  + authentication
  + routes with and without authentication
  + using https (because its 2017!)
  + database example
  + nginx as loadbalancer example for multiple instances

## Installing

  1. Install [node](https://nodejs.org/en/download/package-manager/)
  2. `git clone https://github.com/holymoly/api`
  3. `cd api && npm install`
  4. `node app.js`
  5. Open <http://localhost:8000/hello/42> in your browser
  6. Open <http://localhost:8000/documentation> in your browser
