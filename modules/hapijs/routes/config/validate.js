'use strict';

// Parameter validation
const Joi = require('joi');

// localhost:8000/hello
const get_hello_id = {
  params: {
    // Validate the id parameter
    id: Joi.number()
      .required()
      .description('the id for the todo item'),
  }
}

const post_user = {
  payload: {
    // Validate the firstname
    firstname: Joi.string().alphanum().min(3).max(45).required()
      .description('tfirstname of user'),
    // Validate the lastname
    lastname: Joi.string().alphanum().min(3).max(45).required()
      .description('lastname of user'),
    // Validate the lastname
    username: Joi.string().alphanum().min(3).max(45).required()
      .description('username of user'),
    password: Joi.string().min(6).required()
      .description('password of user'),
    isGuest: Joi.boolean().truthy(['1', 1]).falsy(['0', 0])
      .description('is User Guest'),
    isUser: Joi.boolean().truthy(['1', 1]).falsy(['0', 0])
      .description('is User User'),
    isAdmin: Joi.boolean().truthy(['1', 1]).falsy(['0', 0])
      .description('is User Admin'),
    email: Joi.string().email()
      .description('email of user'),
  }
}

const get_user_email = {
  query: {
    value: Joi.string().email().required(),
  }
}

const get_user_userId = {
  query: {
    value: Joi.number().required(),
  }
}

const del_user = {
  query: {
    email: Joi.string().email().required(),
  }
}

const post_ipc = {
  payload: {
    // Validate the message
    message: Joi.string().required()
      .description(' ipc message')
  }
}

module.exports = {
  get_hello_id,
  post_user,
  get_user_email,
  get_user_userId,
  del_user,
  post_ipc
};
