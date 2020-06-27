"use strict";

// Load logger
const logger = require("../../logger/logger").logRoutes;

// Load sql queries
const handler = require("./config/handler");

// Load auth config
const auth = require("./config/auth");

// Load validation
const validate = require("./config/validate");

// Export all routes to other modules
module.exports = [
  // localhost:8000/
  {
    method: "GET",
    path: "/",
    config: {
      handler: handler.get_root,
      description: "answer if root path was called",
      notes: 'Returns "welcome to the root"',
      tags: ["api"] // Tags for swagger
    }
  },

  // localhost:8000/login
  {
    method: "GET",
    path: "/login",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      auth: auth.login,
      handler: handler.get_login,
      description: "Used for initial authentification",
      notes: `Use Basic Authentification with username and password. Returns a
      cookie with the session information on success. Also returns a json with
      authenticate = true/false. Cookie must be used to authenticate against
      routes with Cookie Auth`,
      tags: ["api", "auth", "scope"] // Tags for swagger
    }
  },

  // localhost:8000/logout
  {
    method: "GET",
    path: "/logout",
    config: {
      handler: handler.get_logout,
      description: "Used for initial authentification",
      notes: `Clears the cookie session`,
      tags: ["api", "auth", "scope"] // Tags for swagger
    }
  },

  // localhost:8000/lights
  {
    method: "GET",
    path: "/lights",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      handler: handler.get_lights,
      auth: auth.lights,
      description: "Get all lights",
      notes:
        "Returns the inventory of the lights plugin. It will contain all light nodes and rooms",
      tags: ["api"] // Tags for swagger
    }
  },

  // localhost:8000/{light}/{room}
  {
    method: "POST",
    path: "/lights/{room}",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      handler: handler.post_light_room,
      auth: auth.lights,
      description: "Sends data to a specific room",
      notes:
        "Sends data to a specific room. Will be received by all lights in the room",
      tags: ["api", "light"], // Tags for swagger
      validate: validate.post_light_room
    }
  },

  // localhost:8000/light/{room}/{node}
  {
    method: "POST",
    path: "/lights/{room}/{node}",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      handler: handler.post_light_room_node,
      auth: auth.lights,
      description: "Sends data to a specific node",
      notes: "Sends data to a specific node",
      tags: ["api", "light"], // Tags for swagger
      validate: validate.post_light_room_node
    }
  },

  // localhost:8000/users
  {
    method: "POST",
    path: "/users",
    config: {
      handler: handler.post_user,
      description: "Create a user",
      notes: "Creates user, set groups and store hashed password in database",
      tags: ["api", "database", "users"], // Tags for swagger
      validate: validate.post_user
    }
  },

  // localhost:8000/users
  {
    method: "GET",
    path: "/users",
    config: {
      handler: handler.get_users,
      description: "Returns all users",
      notes: "Returns array of users",
      tags: ["api", "database", "users"] // Tags for swagger
    }
  },

  // localhost:8000/user
  {
    method: "GET",
    path: "/user/email",
    config: {
      handler: handler.get_user_email,
      description: "Returns a user filtered by email",
      notes: "Returns a user filtered by email",
      tags: ["api", "database", "users"], // Tags for swagger
      validate: validate.get_user_email
    }
  },

  // localhost:8000/user
  {
    method: "GET",
    path: "/user/user_id",
    config: {
      handler: handler.get_user_userId,
      description: "Returns a user filtered by user_id",
      notes: "Returns a user filtered by user_id",
      tags: ["api", "database", "users"], // Tags for swagger
      validate: validate.get_user_userId
    }
  },

  // localhost:8000/user
  {
    method: "DELETE",
    path: "/user",
    config: {
      handler: handler.del_user,
      description: "Deletes a user by email",
      notes: "Deletes a user by email",
      tags: ["api", "database", "users"], // Tags for swagger
      validate: validate.del_user
    }
  },

  // localhost:8000/config
  {
    method: "GET",
    path: "/config",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      handler: handler.get_config,
      auth: auth.lights,
      description: "Returns a config of light nodes",
      notes: "Returns a config of light nodes",
      tags: ["api", "database", "nodes", "config"] // Tags for swagger
    }
  },

  // localhost:8000/config
  {
    method: "POST",
    path: "/config/update",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      handler: handler.post_config_update,
      auth: auth.lights,
      description: "Updates node config",
      notes: "Updates node config",
      tags: ["api", "database", "nodes", "config"], // Tags for swagger
      validate: validate.post_config_update
    }
  },

  // localhost:8000/config
  {
    method: "POST",
    path: "/config/create",
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      },
      handler: handler.post_config_create,
      auth: auth.lights,
      description: "Updates node config",
      notes: "Updates node config",
      tags: ["api", "database", "nodes", "config"], // Tags for swagger
      validate: validate.post_config_create
    }
  }
];
