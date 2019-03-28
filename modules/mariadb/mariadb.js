'use strict';

//Loade mariadb client
const client = require('mariadb');

// Laod config
const config = require('../../config/config.js');

//Load logger
const logger = require('../../modules/logger/logger').logDb;
var mariaClient = client.createPool(config.mariadb);

// Asking MariaDB
async function query(queryString, options) {
  let conn;

  //options.db = config.mariadb.db;
  logger.info('Query : ' + queryString);
  logger.info('Query options: ' + JSON.stringify(options));

  try {
    conn = await mariaClient.getConnection();
    const rows = await conn.query({
      namedPlaceholders: true,
      sql: queryString
    }, options);
    logger.info(JSON.stringify(rows));
    conn.end;
    return rows;
  } catch (err) {
    logger.error('Error during query: ' + err);
    conn.end;
    return err;
  }
};

module.exports.query = query;