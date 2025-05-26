const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'holymoly',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Generic query executor with error handling
async function executeQuery(queryText, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(queryText, params);
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Generic single record query
async function findOne(queryText, params = []) {
  const result = await executeQuery(queryText, params);
  return result.rows[0] || null;
}

// Generic multiple records query
async function findMany(queryText, params = []) {
  const result = await executeQuery(queryText, params);
  return result.rows;
}

// Generic insert operation
async function insert(queryText, params = []) {
  const result = await executeQuery(queryText, params);
  return result.rows[0];
}

// Generic update operation
async function update(queryText, params = []) {
  const result = await executeQuery(queryText, params);
  return result.rows[0];
}

// Generic delete operation
async function remove(queryText, params = []) {
  const result = await executeQuery(queryText, params);
  return result.rowCount;
}

// Transaction wrapper
async function withTransaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  executeQuery,
  findOne,
  findMany,
  insert,
  update,
  remove,
  withTransaction
}; 