require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL');
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('PostgreSQL version:', result.rows[0].version);
    
    client.release();
    await pool.end();
  } catch (err) {
    console.error('Database connection error:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.error('\nPossible reasons for connection failure:');
      console.error('1. PostgreSQL is not installed');
      console.error('2. PostgreSQL service is not running');
      console.error('3. Database credentials are incorrect');
      console.error('\nTry these steps:');
      console.error('1. Install PostgreSQL if not installed');
      console.error('2. Start PostgreSQL service');
      console.error('3. Verify database name and credentials in .env file');
    }
  }
}

testConnection(); 