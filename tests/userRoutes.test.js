const supertest = require('supertest');
const { expect } =  require('chai');
// Import your Hapi server
const { initServer } = require('../server');


const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const util = require('util');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // needed when usign selfsigned certificates



// Generate a JWT token with "scope" as "admin"
async function generateToken() {
    const payload = {
        scope: 'admin',
        sub: "api-items"
    };
    // Replace 'your-secret-key' with your actual JWT secret key
    return jwt.sign(payload, 'some_shared_secret', { expiresIn: '1h' });
}

describe('User Routes', () => {
    let server;
    let request;

    before(async () => {
        server = await initServer();
        await server.start();
        request = supertest(server.info.uri);
    });

    after(async () => {
        await server.stop();
    });

    it('should have a test', async () => {
        // Generate a JWT token
        const token = await generateToken();

        const response = await request
            .get('/api/v1/users')
            .set('Authorization', 'Bearer ' + token) // Attach the token to the request headers;;

        expect(response.status).to.equal(200);
        expect(response.text).to.be.equal('List of users');
        // more assertions
    });
});
