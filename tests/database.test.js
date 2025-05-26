const { expect } = require('chai');
const { Pool } = require('pg');
const users = require('../DBM/users');
require('dotenv').config();

describe('Database Connection Tests', () => {
    let pool;

    before(async () => {
        // Create a new pool with default or environment variables
        pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'holymoly',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres'
        });
    });

    after(async () => {
        // Close the pool
        await pool.end();
    });

    it('should connect to the database', async () => {
        try {
            const client = await pool.connect();
            expect(client).to.exist;
            
            // Test a simple query
            const result = await client.query('SELECT NOW()');
            expect(result.rows).to.have.length(1);
            
            client.release();
        } catch (error) {
            throw new Error(`Database connection failed: ${error.message}`);
        }
    });

    it('should have users table', async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'users'
                );
            `);
            expect(result.rows[0].exists).to.be.true;
        } finally {
            client.release();
        }
    });

    it('should have required columns in users table', async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_schema = 'public' 
                AND table_name = 'users';
            `);

            const columns = result.rows.map(row => row.column_name);
            const requiredColumns = [
                'id',
                'username',
                'password_hash',
                'role',
                'created_at',
                'updated_at',
                'last_login',
                'is_active'
            ];

            requiredColumns.forEach(column => {
                expect(columns).to.include(column,
                    `Missing required column: ${column}`);
            });
        } finally {
            client.release();
        }
    });

    it('should have admin user', async () => {
        try {
            const adminUser = await users.findByUsername('admin');
            expect(adminUser).to.exist;
            expect(adminUser.username).to.equal('admin');
            expect(adminUser.role).to.equal('admin');
            expect(adminUser.is_active).to.be.true;
        } catch (error) {
            throw new Error(`Failed to find admin user: ${error.message}`);
        }
    });

    it('should have proper admin user configuration', async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(`
                SELECT id, username, role, is_active, 
                       password_hash IS NOT NULL as has_password
                FROM users 
                WHERE username = 'admin';
            `);

            expect(result.rows).to.have.length(1);
            const admin = result.rows[0];
            
            expect(admin).to.include({
                username: 'admin',
                role: 'admin',
                is_active: true,
                has_password: true
            });

            // Verify UUID format
            expect(admin.id).to.match(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
            );
        } finally {
            client.release();
        }
    });
}); 