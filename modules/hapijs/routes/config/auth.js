"use strict";

// localhost:8000/login
const login = {
	strategy: "simple",
	scope: ["isadmin", "isuser"] // admin and user
};

// localhost:8000/lights
const lights = {
	strategy: "session",
	scope: ["isuser"] // admin only
};

module.exports = {
	login,
	lights
};
