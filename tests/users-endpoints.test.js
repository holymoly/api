const { expect } = require('chai');
const { initServer } = require('../server');
require('dotenv').config();

describe('Admin Authentication and User Management Test', () => {
    let server;
    let adminToken;
    let testUserId;
    let testUserToken;

    before(async () => {
        // Initialize server
        server = await initServer();
        
        // Log all registered routes
        console.log('\nRegistered Routes:');
        server.table().forEach(route => {
            console.log(`${route.method}\t${route.path}`);
        });
        console.log('\n');
    });

    after(async () => {
        // Stop server
        await server.stop();
    });

    it('should authenticate admin and return JWT token', async () => {
        const loginPath = '/api/v1/auth/login';
        console.log('\nTrying login with path:', loginPath);
        
        const response = await server.inject({
            method: 'POST',
            url: loginPath,
            payload: {
                username: 'admin',
                password: process.env.ADMIN_PASSWORD || 'admin123'
            }
        });

        console.log('Auth Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result).to.have.property('data');
        expect(response.result.data).to.have.property('token');
        expect(response.result.status).to.equal('success');

        adminToken = response.result.data.token;
    });

    it('should create a test user', async () => {
        const createUserPath = '/api/v1/users/';
        
        const newUser = {
            username: 'testuser_temp',
            password: 'Test123!@#',
            role: 'user'
        };

        const response = await server.inject({
            method: 'POST',
            url: createUserPath,
            payload: newUser,
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });

        console.log('Create User Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result.status).to.equal('success');
        expect(response.result.data).to.have.property('id');
        expect(response.result.data.username).to.equal(newUser.username);
        expect(response.result.data.role).to.equal(newUser.role);

        testUserId = response.result.data.id;
    });

    it('should authenticate test user and return JWT token', async () => {
        const loginPath = '/api/v1/auth/login';
        console.log('\nTrying test user login with path:', loginPath);
        
        const response = await server.inject({
            method: 'POST',
            url: loginPath,
            payload: {
                username: 'testuser_temp',
                password: 'Test123!@#'
            }
        });

        console.log('Test User Auth Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result).to.have.property('data');
        expect(response.result.data).to.have.property('token');
        expect(response.result.status).to.equal('success');

        testUserToken = response.result.data.token;
    });

    it('should allow test user to update their own profile', async () => {
        const updateUserPath = `/api/v1/users/${testUserId}`;
        console.log('\nTrying to update test user profile with path:', updateUserPath);
        
        const updateData = {
            is_active: true
        };

        const response = await server.inject({
            method: 'PUT',
            url: updateUserPath,
            payload: updateData,
            headers: {
                Authorization: `Bearer ${testUserToken}`
            }
        });

        console.log('Self Update Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result.status).to.equal('success');
        expect(response.result.data.id).to.equal(testUserId);
        expect(response.result.data.is_active).to.equal(updateData.is_active);
    });

    it('should prevent test user from updating another user profile', async () => {
        // First create another test user as admin
        const createUserPath = '/api/v1/users/';
        const anotherUser = {
            username: 'another_user',
            password: 'Test123!@#',
            role: 'user'
        };

        const createResponse = await server.inject({
            method: 'POST',
            url: createUserPath,
            payload: anotherUser,
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });

        expect(createResponse.statusCode).to.equal(200);
        const anotherUserId = createResponse.result.data.id;

        // Now try to update the other user's profile with test user token
        const updateUserPath = `/api/v1/users/${anotherUserId}`;
        console.log('\nTrying to update another user profile with path:', updateUserPath);
        
        const updateData = {
            is_active: false
        };

        const response = await server.inject({
            method: 'PUT',
            url: updateUserPath,
            payload: updateData,
            headers: {
                Authorization: `Bearer ${testUserToken}`
            }
        });

        console.log('Update Another User Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(403);
        expect(response.result.error).to.equal('Forbidden');

        // Clean up - delete the other test user
        const deleteResponse = await server.inject({
            method: 'DELETE',
            url: updateUserPath,
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });

        expect(deleteResponse.statusCode).to.equal(200);
    });

    it('should update the test user as admin', async () => {
        const updateUserPath = `/api/v1/users/${testUserId}`;
        console.log('\nTrying to update user with path:', updateUserPath);
        
        const updateData = {
            role: 'user',
            is_active: true
        };

        const response = await server.inject({
            method: 'PUT',
            url: updateUserPath,
            payload: updateData,
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });

        console.log('Update User Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result.status).to.equal('success');
        expect(response.result.data.id).to.equal(testUserId);
        expect(response.result.data.role).to.equal(updateData.role);
        expect(response.result.data.is_active).to.equal(updateData.is_active);
    });

    it('should delete the test user', async () => {
        const deleteUserPath = `/api/v1/users/${testUserId}`;
        console.log('\nTrying to delete user with path:', deleteUserPath);
        
        const response = await server.inject({
            method: 'DELETE',
            url: deleteUserPath,
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });

        console.log('Delete User Response:', {
            statusCode: response.statusCode,
            result: response.result
        });

        expect(response.statusCode).to.equal(200);
        expect(response.result.status).to.equal('success');
        expect(response.result.message).to.equal('User deleted successfully');

        // Verify user is deleted by trying to get it
        const verifyResponse = await server.inject({
            method: 'GET',
            url: `/api/v1/users/${testUserId}`,
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });

        expect(verifyResponse.statusCode).to.equal(404);
    });
}); 