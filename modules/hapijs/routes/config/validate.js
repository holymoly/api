"use strict";

// Parameter validation
const Joi = require("@hapi/joi");

const post_light_room_node = {
  params: Joi.object({
    room: Joi.string()
      .required()
      .description("room of the node"),
    node: Joi.string()
      .required()
      .description("node name to be adressed")
  }),
  payload: {
    type: Joi.string()
      .required()
      .description("command for specific light"),
    cmd: Joi.string()
      .optional()
      .description("comand to be executed"),
    value: Joi.string()
      .optional()
      .description("value for command"),
    red: Joi.string()
      .optional()
      .description("value for command"),
    green: Joi.string()
      .optional()
      .description("value for command"),
    blue: Joi.string()
      .optional()
      .description("value for command"),
    speed: Joi.string()
      .optional()
      .description("value for command")
  }
};

const post_light_room = {
  params: Joi.object({
    room: Joi.string()
      .required()
      .description("room of the node")
  }),
  payload: {
    type: Joi.string()
      .required()
      .description("command for specific light"),
    cmd: Joi.string()
      .optional()
      .description("comand to be executed"),
    value: Joi.string()
      .optional()
      .description("value for command"),
    red: Joi.string()
      .optional()
      .description("value for command"),
    green: Joi.string()
      .optional()
      .description("value for command"),
    blue: Joi.string()
      .optional()
      .description("value for command"),
    speed: Joi.string()
      .optional()
      .description("value for command")
  }
};

const post_user = {
  payload: {
    // Validate the firstname
    firstname: Joi.string()
      .alphanum()
      .min(3)
      .max(45)
      .required()
      .description("tfirstname of user"),
    // Validate the lastname
    lastname: Joi.string()
      .alphanum()
      .min(3)
      .max(45)
      .required()
      .description("lastname of user"),
    // Validate the lastname
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(45)
      .required()
      .description("username of user"),
    password: Joi.string()
      .min(6)
      .required()
      .description("password of user"),
    isGuest: Joi.boolean()
      .truthy("1")
      .falsy("0")
      .description("is User Guest"),
    isUser: Joi.boolean()
      .truthy("1")
      .falsy("0")
      .description("is User User"),
    isAdmin: Joi.boolean()
      .truthy("1")
      .falsy("0")
      .description("is User Admin"),
    email: Joi.string()
      .email()
      .description("email of user")
  }
};

const get_user_email = {
  query: {
    value: Joi.string()
      .email()
      .required()
  }
};

const get_user_userId = {
  query: {
    value: Joi.number().required()
  }
};

const del_user = {
  query: {
    username: Joi.string().required()
  }
};

module.exports = {
  post_user,
  get_user_email,
  get_user_userId,
  del_user,
  post_light_room_node,
  post_light_room
};
