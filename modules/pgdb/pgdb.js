const {
  Pool
} = require('pg')

// Laod config
const config = require('../../config/config.js');

//Load logger
const logger = require('../../modules/logger/logger').logDb;

const pool = new Pool();

//queriesdata is a json that holds the query and the parameter
//{queries[{
//query:"Select $1 from $2",
//parameters:["person","accounts"]}
//]}
async function queryTransactionSave(queriesData) {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  logger.debug('Execute query data: ' + JSON.stringify(queriesData));
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
      //make sure queries are executed sync
    for (const queryData of queriesData.queries) {
      logger.debug('Execute query: ' + JSON.stringify(queryData));
      const res = await client.query(queryData.query, queryData.parameters)
      logger.debug('Result: ' + JSON.stringify(res));
    }
    await client.query('COMMIT')
    return (undefined, "User added to database");
  } catch (err) {
    await client.query('ROLLBACK')
    logger.error('Error during transactional query: ' + err);
    return (err);
  } finally {
    client.release()
  }
}

//{
//query:"Select $1 from $2",
//parameters:["person","accounts"]
//}
async function query(queryData) {
  try {
    logger.debug('Execute query: ' + JSON.stringify(queryData));
    const res = await pool.query(queryData.query, queryData.parameters)
    logger.debug('Result: ' + JSON.stringify(res.rows));
    return res;
  } catch (err) {
    logger.error('Error during query: ' + err);
    return err;
  }
}

module.exports.queryTransactionSave = queryTransactionSave;
module.exports.query = query;