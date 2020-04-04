"use strict";

// pgdb
const pgdb = require("../../../pgdb/pgdb");

// Load query
const query = require("../../../pgdb/query");

// Load logger
const logger = require("../../../logger/logger").logRoutes;

//password handling
const auth = require("../../auth");

// Load plugins
var LightPlugin = require("../../../plugins/light/light");

// Load Config
var config = require("../../../../config/config");

// #############################PLUGINS########################################
// Check which Plugins should be activated
logger.info("Checking confgured api plugins");
// Light Plugin
if (config.plugins.light) {
  logger.info("Activating light plugin");

  // Load plugins
  var lightPlugin = new LightPlugin();
  logger.debug("General uuid for light plugin: " + lightPlugin._uid);
}

// localhost:8000/
const get_root = (request, h) => {
  return replyToClient(undefined, "welcome to the root");
};

// localhost:8000/login
const get_login = (request, h) => {
  return replyToClient(undefined, {
    authenticated: true
  });
};

// localhost:8000/login
const get_logout = (request, h) => {
  request.cookieAuth.clear();
  return replyToClient(undefined, {
    authenticated: false
  });
};

// localhost:8000/light/{room}
const post_light_room = async (request, h) => {
  var data = request.payload;
  var result = { message: "sucsess" };
  var topic = "light/space/" + request.params.room + "/";
  //var topic = "light/space/" + "meeting" + "/";

  lightPlugin.publish(topic, JSON.stringify(data));
  logger.debug("Send data to topic " + topic + ": " + JSON.stringify(data));

  return replyToClient(undefined, result);
};

// localhost:8000/light/{room}/{node}
const post_light_room_node = async (request, h) => {
  var data = request.payload;
  var result = { message: "sucsess" };
  var topic =
    "light/space/" + request.params.room + "/" + request.params.node + "/";
  //var topic = "light/space/" + "meeting" + "/" + "heinz/";

  lightPlugin.publish(topic, JSON.stringify(data));
  logger.debug("Send data to topic " + topic + ": " + JSON.stringify(data));

  return replyToClient(undefined, result);
};

// localhost:8000/users
const post_user = async (request, h) => {
  var data = request.payload;
  logger.debug("Create user with data: " + JSON.stringify(data));
  try {
    // generate salt and hash
    var salt = await auth.generateSalt().catch(errorHandling);
    logger.debug("Created salt: " + salt);
    var hash = await auth
      .hashPassword(data.password, salt[1])
      .catch(errorHandling);
    logger.debug("Created hash: " + hash);
    data.hash = hash[1];
    var preparedQuer = [];
    //setup query parameters
    query.createUser.queries[0].parameters = [
      data.firstname,
      data.lastname,
      data.username,
      data.email
    ];
    query.createUser.queries[1].parameters = [data.hash, data.username];
    query.createUser.queries[2].parameters = [
      data.username,
      data.isGuest,
      data.isUser,
      data.isAdmin
    ];

    var result = await pgdb
      .queryTransactionSave(query.createUser)
      .catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, "cannot hash password");
  }
};

// localhost:8000/users
const get_users = async (request, h) => {
  var result = await pgdb.query(query.getUsers).catch(errorHandling);
  return replyToClient(undefined, result);
};

// localhost:8000/user
const get_user_email = async (request, h) => {
  query.getUserFilterEmail.parameters = [request.query.value];
  var result = await pgdb.query(query.getUserFilterEmail).catch(errorHandling);
  return replyToClient(undefined, result);
};

// localhost:8000/user
const get_user_userId = async (request, h) => {
  query.getUserFilterUserId.parameters = [request.query.value];
  var result = await pgdb.query(query.getUserFilterUserId).catch(errorHandling);
  return replyToClient(undefined, result);
};

// localhost:8000/user
const del_user = async (request, h) => {
  query.deleteUser.parameters[0] = request.query.username;
  var result = await pgdb.query(query.deleteUser).catch(errorHandling);
  return replyToClient(undefined, result);
};

const get_lights = async (request, h) => {
  var result = await lightPlugin.inventory;
  return replyToClient(undefined, result);
};

// Helper function for reply
function replyToClient(err, data) {
  if (err) {
    logger.error("Reply Error:" + err);
    return err;
  } else {
    logger.debug("Reply: " + JSON.stringify(data));
    return data;
  }
}

function errorHandling(reason) {
  logger.error(reason);
  replyToClient(reason, undefined);
}

module.exports = {
  get_root,
  get_login,
  get_logout,
  post_user,
  get_users,
  get_user_email,
  get_user_userId,
  del_user,
  get_lights,
  post_light_room_node,
  post_light_room
};
