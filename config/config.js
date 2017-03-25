// Server Configuration
const hapiServer = {
  host: 'localhost',
  port: 8000
}

// DB configuration
const mariadb = {
  host: '127.0.0.1',
  user: 'test',
  password: 'test',
  // db: 'database',
  multiStatements: true,
  compress: true
}

// Logging configuration
const logger = {
  level: {
    auth: 'debug',
    db: 'debug',
    routes: 'debug',
    app: 'debug'
  },
}

module.exports = {
  hapiServer,
  mariadb,
  logger
};
