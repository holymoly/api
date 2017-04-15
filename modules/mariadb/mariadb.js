'use strict';

//Loade mariadb client
const client = require('mariasql');

// Laod config
const config = require('../../config/config.js');

//Load logger
const logger = require('../../modules/logger').logDb;

// Asking MariaDB
function query(queryString,options, cb){
  //console.log(queryString );
  // Prepare client connection
  var mariaClient = new client(config.mariadb);

  // Check if ready
  mariaClient.on('ready', function(){
    logger.debug('MariaDB Client ready');
  });

  // Check if error
  mariaClient.on('error', function(err){
    logger.error('MariaDB Client Error: ' + err);
    mariaClient.end();
  });

  // Check if end
  mariaClient.on('end', function(){
    logger.debug('MariaDB Client ended');
  });

  // Check if close
  mariaClient.on('close', function(){
    logger.debug('MariaDB Client closed');
  });

  // Preparing the query
  var preparedQuery = mariaClient.prepare(queryString);
  logger.debug('Query: ' + preparedQuery(options));

  // Executing the query and passing parameters
  mariaClient.query(preparedQuery(options), null, { useArray: true}, function(err, rows) {
    // Error or no result
    if (err || rows.info.numRows == 0) {
      var reason = err;
      // no result
      if (rows.info.numRows == 0){
        reason = 'not found';
      }
      logger.error(reason);
      cb(reason, undefined);
    } else {
      logger.debug('Query Result: ' + rows);
      cb(err, rows);
    }
    mariaClient.end();
  });
};

module.exports.query = query;
