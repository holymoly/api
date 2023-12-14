const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Jwt = require('@hapi/jwt');
const Blipp = require('blipp');

const fs = require('fs');
const path = require('path');

const JWT_SECRET = 'some_shared_secret';
const SWAGGER_OPTIONS = {
  info: {
    title: 'API Documentation',
    version: '1.0.0'
  },
  grouping: 'tags',
  tags: [
    { name: 'v1', description: 'API Version 1' },
    { name: 'v2', description: 'API Version 2' }
  ],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ jwt: [] }],
};

const init = async () => {
  const server = Hapi.server({ 
    port: 3000, 
    host: 'localhost',
    tls: {
        key: fs.readFileSync(path.join(__dirname + "/certs", 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname + "/certs", 'cert.pem'))
    } });

  await registerPlugins(server);
  defineAuthStrategy(server);
  await loadRoutes(server);
  await startServer(server);
};

const registerPlugins = async (server) => {
  await server.register([
    Jwt, // Register JWT plugin here
    Inert,
    Vision,
    Blipp,
    { plugin: HapiSwagger, options: SWAGGER_OPTIONS}
  ]);
};

const defineAuthStrategy = (server) => {
  server.auth.strategy('jwt_strategy', 'jwt', {
    keys: JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: 'api-items',
      maxAgeSec: 345600 // 4 days
    },
    validate: (artifacts) => ({ isValid: true })
  });
  server.auth.default('jwt_strategy');
};

const loadRoutes = async (server) => {
  const versions = fs.readdirSync(path.join(__dirname, 'routes'));
  versions.forEach(version => {
    const resources = fs.readdirSync(path.join(__dirname, 'routes', version));
    resources.forEach(resource => {
      const methodFolders = fs.readdirSync(path.join(__dirname, 'routes', version, resource));
      methodFolders.forEach(methodFolder => {
        const routeModulePath = `./routes/${version}/${resource}/${methodFolder}`;
        const routes = require(routeModulePath);
        routes.forEach(route => {
          route.path = `/api/${version}/${resource}`;
          server.route(route);
        });
      });
    });
  });
};

const startServer = async (server) => {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  console.log(`Swagger documentation available at: ${server.info.uri}/documentation`);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

init();