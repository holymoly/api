# API Server with Hapi and PostgreSQL

A REST API server built with Hapi.js, featuring JWT authentication, PostgreSQL database, and Swagger documentation.

## Features
- API versioning with URL structure `/api/v1/...`
- Swagger API documentation at `/documentation`
- JWT authentication with role-based access (admin, user)
- PostgreSQL database integration
- HTTPS support
- Modular route structure
- Comprehensive API endpoint examples

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/holymoly/api
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate SSL certificates:
   ```bash
   cd certs
   chmod +x generate.sh
   ./generate.sh
   cd ..
   ```

4. Set up the environment:
   ```bash
   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   ```

   Required environment variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password

   # Server Configuration
   PORT=3000
   HOST=localhost

   # JWT Configuration
   JWT_SECRET=your_super_secret_key_change_this_in_production
   JWT_EXPIRATION=4h

   # Admin Configuration
   ADMIN_PASSWORD=change_this_password_immediately
   ```

5. Create PostgreSQL database:
   ```bash
   createdb your_db_name
   ```

6. Start the server:
   ```bash
   npm start
   ```

   The server will automatically:
   - Initialize the database tables
   - Create the admin user if it doesn't exist
   - Start the HTTP server

## Usage

1. Access the API:
   - API Base URL: `https://localhost:3000/api/v1`
   - Swagger Documentation: `https://localhost:3000/documentation`

2. Default Admin Credentials:
   - Username: `admin`
   - Password: Value from `ADMIN_PASSWORD` in .env (change after first login)

3. Authentication:
   - Login endpoint: `POST /api/v1/auth/login`
   - Use the received JWT token in the Authorization header:
     ```
     Authorization: Bearer your_jwt_token
     ```

## API Structure
- `/api/v1/auth` - Authentication endpoints
- `/api/v1/users` - User management
- `/api/v1/items` - Item management
- `/api/v1/itemclass` - Item classification
- `/api/v1/statemodel` - State management

## Security Notes
1. Change the default admin password after first login
2. Use strong, unique values for `JWT_SECRET` and `ADMIN_PASSWORD`
3. Keep your `.env` file secure and never commit it to version control
4. Regularly update dependencies for security patches

## Development
- Routes are automatically loaded from the `routes` directory
- Add new API versions by creating new directories under `routes`
- Use the provided database utilities in `DBM` for database operations

## What's Next (ToDo)
- [ ] Module-specific logging (auth, routes, db, logger)
- [ ] Winston integration for logging
- [ ] Additional database query examples
- [ ] Enhanced error handling
- [ ] Rate limiting
- [ ] Request validation
- [ ] API documentation improvements

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
MIT
