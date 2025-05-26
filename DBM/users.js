const db = require('./db');
const bcrypt = require('bcrypt');

// SQL Queries
const SQL = {
  CREATE_USERS_TABLE: `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP WITH TIME ZONE,
      is_active BOOLEAN DEFAULT true
    )
  `,
  INSERT_USER: `
    INSERT INTO users (username, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING id, username, role, created_at, updated_at, is_active
  `,
  FIND_BY_USERNAME: `
    SELECT id, username, password_hash, role, is_active, created_at, updated_at, last_login
    FROM users
    WHERE username = $1
  `,
  FIND_BY_ID: `
    SELECT id, username, role, is_active, created_at, updated_at, last_login
    FROM users
    WHERE id = $1
  `,
  UPDATE_LAST_LOGIN: `
    UPDATE users
    SET last_login = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, username, last_login
  `,
  UPDATE_USER: `
    UPDATE users
    SET username = COALESCE($2, username),
        role = COALESCE($3, role),
        is_active = COALESCE($4, is_active),
        password_hash = COALESCE($5, password_hash),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, username, role, is_active, created_at, updated_at, last_login
  `,
  DELETE_USER: `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
  `,
  LIST_USERS: `
    SELECT id, username, role, is_active, created_at, updated_at, last_login
    FROM users
    ORDER BY created_at DESC
  `
};

// Initialize database with users table and admin user
async function initializeDatabase() {
  const client = await db.pool.connect();
  try {
    // Start transaction
    await client.query('BEGIN');

    // Create users table
    await client.query(SQL.CREATE_USERS_TABLE);

    // Check if admin user exists
    const adminCheck = await client.query(
      'SELECT id FROM users WHERE username = $1',
      ['admin']
    );

    if (adminCheck.rows.length === 0) {
      const saltRounds = 10;
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

      await client.query(SQL.INSERT_USER, ['admin', passwordHash, 'admin']);

      console.log('Admin user created:');
      console.log('Username: admin');
      console.log('Password:', adminPassword);
      console.log('\nIMPORTANT: Please change the admin password after first login!');
    }

    // Commit transaction
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// User operations
const users = {
  // Create a new user
  create: async (username, passwordHash, role = 'user') => {
    return db.insert(SQL.INSERT_USER, [username, passwordHash, role]);
  },

  // Find user by username (for authentication)
  findByUsername: async (username) => {
    return db.findOne(SQL.FIND_BY_USERNAME, [username]);
  },

  // Find user by ID
  findById: async (id) => {
    return db.findOne(SQL.FIND_BY_ID, [id]);
  },

  // Update user's last login
  updateLastLogin: async (id) => {
    return db.update(SQL.UPDATE_LAST_LOGIN, [id]);
  },

  // Update user details
  update: async (id, { username, role, is_active, password_hash }) => {
    return db.update(SQL.UPDATE_USER, [id, username, role, is_active, password_hash]);
  },

  // Delete user
  delete: async (id) => {
    return db.remove(SQL.DELETE_USER, [id]);
  },

  // List all users
  list: async () => {
    return db.findMany(SQL.LIST_USERS);
  },

  // Example of a transaction (creating multiple users)
  createMany: async (users) => {
    return db.withTransaction(async (client) => {
      const results = [];
      for (const user of users) {
        const result = await client.query(SQL.INSERT_USER, 
          [user.username, user.passwordHash, user.role]);
        results.push(result.rows[0]);
      }
      return results;
    });
  }
};

module.exports = {
  initializeDatabase,
  ...users
}; 