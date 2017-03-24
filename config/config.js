// Server Configuration

const hapiServer = { 
  host: 'localhost',
  port: 8000 
}

const mariadb = {
  host: '127.0.0.1',
  user: 'root',
  password: 'blahblah',
  // db: 'database',
  multiStatements: true,
  compress: true
}

module.exports = {
  hapiServer,
  mariadb,
};