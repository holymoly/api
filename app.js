// start.js
require('dotenv').config();
const { createServer, initServer } = require('./server');

// Import database initialization function
const { initializeDatabase } = require('./DBM/users');

// Test environment variables loading
console.log('Environment Check:');
console.log('Database:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
});
console.log('Server:', {
    port: process.env.PORT,
    host: process.env.HOST
});

const start = async () => {
    try {
        // Initialize database first
        console.log('Initializing database...');
        await initializeDatabase();
        console.log('Database initialization completed');

        // Start the server
        const server = await initServer();
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
        console.log(`Swagger documentation available at: ${server.info.uri}/documentation`);
    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

start();