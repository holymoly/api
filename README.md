# Sample hapi REST Api server
Self teaching hapi

## What it does

  + query postgres for existing databases `http://localhost:8000/databases`
  + uses winston for logging
  + log output seperated by module (auth, routes, db, logger)
  + basic authentication on `http://localhost:8000/login` to receive a cookie
  + provides a route `http://localhost:8000/hello/{id}` available after cookie was received
  + replys with `hello id: 42` where 42 ist the {id}
  + uses swagger for api documentation `http://localhost:8000/documentation`
  + uses joi to verify parameters
  + seperates routes in a file `/modules/routes.js`
  + seperates plugin in a file `/pugins/plugins.js`
  + swagger documentation grouped by tag
  + user enviroment variables for configuration (see set_env.sh)

## What is missing (ToDo)

  + ~~seperate handlers from routes~~
  + ~~more routes~~
  + ~~authentication~~
  + ~~routes with and without authentication~~
  + ~~using https~~ (because its 2017!)
  + ~~database example~~
  + automated testing
  + ~~nginx as loadbalancer~~ not part of the app
  + ~~example for multiple instances~~ can be handled elswhere (nginx, kubernetes)
  + ~~jwt integration~~

## Installing

  1. Install [node](https://nodejs.org/en/download/package-manager/)
  2. `git clone https://github.com/holymoly/api`
  3. `cd api && npm install`
  4. `node app.js`
  5. Open <http://localhost:8000/login> in your browser
  6. Open <http://localhost:8000/hello/42> in your browser
  7. Open <http://localhost:8000/documentation> in your browser

## Build the Testenviroment
  1. ```
    docker pull rabbitmq
    docker run -d --hostname api-test --name api-test -e RABBITMQ_DEFAULT_USER=test -e RABBITMQ_DEFAULT_PASS=test -p 8080:15672 -p 1883:1883 rabbitmq:3-management
    docker exec -it api-test /bin/bash
    rabbitmq-plugins enable rabbitmq_mqtt
    exit
  ```
  2. ```
    docker run -d --name some-postgres -e POSTGRES_PASSWORD=test -p 5432:5432  postgres

  ```
