const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Jwt = require('@hapi/jwt');
const Blipp = require('blipp');
const fs = require('fs');
const path = require('path');
const Joi = require('@hapi/joi');

const JWT_SECRET = 'some_shared_secret';
const SWAGGER_OPTIONS = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
    },
    grouping: 'tags',
    tags: [
        { name: 'v1', description: 'API Version 1' },
        { name: 'v2', description: 'API Version 2' },
    ],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ jwt: [] }],
};

const BLIPP_OPTIONS = { 
    showAuth: true,
    showScope:true
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

const initServer = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        tls: {
            key: fs.readFileSync(path.join(__dirname + '/certs', 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname + '/certs', 'cert.pem')),
        },
    });

    await server.register([
        Jwt, // Register JWT plugin here
        Inert,
        Vision,
        { plugin: HapiSwagger,
          options: SWAGGER_OPTIONS
        },
        { plugin: Blipp, 
          options: BLIPP_OPTIONS
        }
    ]);

    defineAuthStrategy(server);
    await loadRoutes(server);

    return server;
};

const defineAuthStrategy = (server) => {
    server.auth.strategy('jwt_strategy', 'jwt', {
        keys: JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: 'api-items',
            maxAgeSec: 345600, // 4 days
        },
        validate: (artifacts) => ({ isValid: true }),
    });
    server.auth.default('jwt_strategy');
};

const loadRoutes = async (server) => {
    const versions = fs.readdirSync(path.join(__dirname, 'routes'));
    
    const loadResourceRoutes = (basePath, resourcePath) => {
        let resourceRoutes = [];
        const currentPath = path.join(__dirname, 'routes', ...resourcePath);
        
        const items = fs.readdirSync(currentPath);
        
        items.forEach((item) => {
            const fullPath = path.join(currentPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                // Recursively load routes from subdirectory
                const subRoutes = loadResourceRoutes(
                    basePath, 
                    [...resourcePath, item]
                );
                resourceRoutes = [...resourceRoutes, ...subRoutes];
            } else if (item.endsWith('.js') && !item.includes('schema')) {
                // Load routes from file
                const routeModulePath = `./${path.join('routes', ...resourcePath, item)}`;
                const routes = require(routeModulePath);
                
                routes.forEach((route) => {
                    // Construct the full path
                    const apiPath = [...basePath, ...resourcePath].join('/');
                    route.path = `/api/${apiPath}${route.path}`;
                    resourceRoutes.push(route);
                });
            }
        });
        
        return resourceRoutes;
    };

    versions.forEach((version) => {
        const resources = fs.readdirSync(path.join(__dirname, 'routes', version));
        resources.forEach((resource) => {
            const routes = loadResourceRoutes([version], [version, resource]);
            if (routes.length > 0) {
                server.route(routes);
            }
        });
    });
};

module.exports = { initServer };

//startServer();