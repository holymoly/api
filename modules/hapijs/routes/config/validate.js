'use strict';

// Parameter validation
const Joi = require('@hapi/joi');

const get_hello_id = {
  params: Joi.object({
    // Validate the id parameter
    id: Joi.number()
      .required()
      .description('the id for the todo item'),
  })
}

const post_itemClass = {
  payload: Joi.object({
    Name: Joi.string().alphanum().min(3).max(45).required()
      .description('Name of Class'),
    Description: Joi.string().alphanum()
      .description('Description of Class'),
    Type: Joi.string().alphanum()
      .description('Used to define different Types i.e. equipment, maaterial...'),
  })
}

const del_itemClass = {
  query: Joi.object({
    ItemClassID: Joi.number().required()
      .description('ItemClassID of "itemClass"."ItemClass"'),
  })
}

const post_itemClassProperty = {
  payload: Joi.object({
    Name: Joi.string().alphanum().min(3).max(45).required()
      .description('Name of Class'),
    Description: Joi.string().alphanum()
      .description('Description of Class'),
    Type: Joi.string().alphanum()
      .description('Used to define different Types i.e. equipment, maaterial...'),
    ItemClassID: Joi.number().required()
      .description('ItemClass the property belongs to'),
    UoM: Joi.string().alphanum()
      .description('Unit of Measure'),
  })
}

const del_itemClassProperty = {
  query: Joi.object({
    ItemClassID: Joi.number().required()
      .description('PropertyID of "itemClass"."Properties"'),
  })
}

const post_itemClassStateModel = {
  payload: Joi.object({
    Name: Joi.string().alphanum().min(3).max(45).required()
      .description('Name of Class'),
    Description: Joi.string().alphanum()
      .description('Description of Class'),
    ItemClassID: Joi.string().alphanum()
      .description('ItemClass the StateModel belongs to'),
  })
}

const del_itemClassStateModel = {
  query: Joi.object({
    StateModelID: Joi.number().required()
      .description('StateModelID of "itemClass"."StateModel"'),
  })
}

const post_item = {
  payload: Joi.object({
    Name: Joi.string().alphanum().min(3).max(45).required()
      .description('Name of Class'),
    Description: Joi.string().alphanum()
      .description('Description of Class'),
    ItemClassID: Joi.string().alphanum()
      .description('ItemClass the Item belongs to'),
  })
}

const del_item = {
  query: Joi.object({
    ItemID: Joi.number().required()
      .description('StateModelID of "items"."Items"'),
  })
}

const put_itemProperty = {
  payload: Joi.object({
    Value: Joi.string().alphanum().required()
      .description('Value of Property'),
  })
}


const put_itemStateModel = {
  payload: Joi.object({
    Value: Joi.string().alphanum().required()
      .description('Value of StateModel'),
  })
}

module.exports = {
  get_hello_id,
  post_itemClass,
  del_itemClass,
  post_itemClassProperty,
  del_itemClassProperty,
  post_itemClassStateModel,
  del_itemClassStateModel,
  post_item,
  post_item,
  del_item,
  put_itemProperty,
  put_itemStateModel
};