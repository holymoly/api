'use strict';
// Api Documentation /documentation
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Cookie = require('@hapi/cookie');

// Basic Auth
const BasicAuth = require('@hapi/basic');

// Load hapi module
const Hapi = require('@hapi/hapi');

// Load Config
var config = require('./config/config');

// plugins
var plugins = require('./modules/hapijs/plugins/plugins');

// Load routes definition
var routes = require('./modules/hapijs/routes/routes');

// Load routes auth
var validate = require('./modules/hapijs/auth').validate;

// Load logger
var logger = require('./modules/logger/logger').logApp;

// databus client
// var Databus = require('./modules/databus/databusClient');
// setup databus
// var databusClient = new Databus('databus', config.databus, 'APP');


// Receiving databus events
//var recDatabus = function recDatabus(data) {
//  logger.debug(data);
//};
// databusClient._eventEmitter.on('databus', recDatabus);

(async () => {
    // Create a server with a host and port
    const server = new Hapi.Server(
        config.hapiServer
    );

    //server.connection(config.hapiServer);

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    // register plugins
    await server.register([
        Inert,
        Vision, {
            plugin: HapiSwagger,
            options: swaggerOptions
        },
        Cookie,
        BasicAuth
    ]);

    logger.info('Hapi Server registered plugins');

    // Activate simple auth
    server.auth.strategy('simple', 'basic', {
        validate
    });

    // Activate session auth
    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'api-session',
            password: 'SuperMegaHyperAwesomeSecretPassword',
            isSecure: false
        }
    })

    // Add all routes,
    server.route(routes);

    // Start Server
    await start();

    function start() {
        // Start server
        server.start((err) => {
            if (err) {
                logger.error(err);
                throw err;
            } else {
                logger.info('Server running at:', server.info.uri);
            }
        });
    }

    function stop() {
        // Start server
        server.stop((err) => {
            if (err) {
                logger.error(err);
                throw err;
            } else {
                logger.info('Server stoped!');
            }
        });
    }
})();