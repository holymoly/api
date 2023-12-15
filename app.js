// start.js
const { createServer, initServer } = require('./server');

const start = async () => {
    const server = await initServer();
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    console.log(`Swagger documentation available at: ${server.info.uri}/documentation`);
};

start();