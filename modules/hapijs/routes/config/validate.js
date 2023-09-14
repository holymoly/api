'use strict';

// Parameter validation
const Joi = require('joi');

// Load logger
const logger = require('../../../logger/logger').logRoutes;

const get_hello_id = {
  params: Joi.object({
    // Validate the id parameter
    id: Joi
    .number()
    .required()
    .description('the id for the todo item'),
  }),
  failAction: logValidateError
}

const get_itemClass = {
  params: Joi.object({
    className: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
  }),
  failAction: logValidateError
}

const post_itemClass = {
  payload: Joi.object({
    Name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
    Description: Joi
    .string()
    .description('Description of Class'),
    Type: Joi
    .string()
    .alphanum()
    .description('Used to define different Types i.e. equipment, maaterial...'),
  }).label('itemClass'),
  failAction: logValidateError
}

const del_itemClass = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ClassID of Item Class')
  }),
  failAction: logValidateError
}

const get_itemClassProperties = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ClassID of Item Class')
  }),
  failAction: logValidateError
}

const get_itemClassProperty = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ClassID of Item Class'),
    propertyid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('PropertyId of Item Class Property')
  }),
  failAction: logValidateError
}

const post_itemClassProperty = {
  payload: Joi.object({
    Name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
    Description: Joi
    .string()
    .description('Description of Class'),
    Type: Joi
    .string()
    .alphanum()
    .description('Used to define different Types i.e. equipment, maaterial...'),
    ItemClassID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ClassID of Item Class'),
    UoM: Joi.string().alphanum()
    .description('Unit of Measure'),
  }).label('itemClassProperty'),
  failAction: logValidateError
}

const del_itemClassProperty = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemClassID of "itemClass""'),
    propertyid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('PropertyID of "itemClass"."Properties"'),
  }),
  failAction: logValidateError
}

const get_itemClassStateModels = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ClassID of Item Class')
  }),
  failAction: logValidateError
}

const get_itemClassStateModel = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ClassID of Item Class'),
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('PropertyID of "itemClass"."Properties"')
  }),
  failAction: logValidateError
}

const post_itemClassStateModel = {
  payload: Joi.object({
    Name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
    Description: Joi
    .string()
    .description('Description of Class'),
    ItemClassID: Joi
    .string()
    .alphanum()
    .description('ItemClass the StateModel belongs to'),
  }).label('itemClassStateModel'),
  failAction: logValidateError
}

const del_itemClassStateModel = {
  params: Joi.object({
    classid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemClassID of "itemClass"'),
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of "itemClass"."StateModel"'),
  }),
  failAction: logValidateError
}

const get_stateModelStates = {
  params: Joi.object({
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of State Model')
  }),
  failAction: logValidateError
}

const get_stateModelState = {
  params: Joi.object({
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of State Model'),
    stateid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateID of State')
  }),
  failAction: logValidateError
}

const post_stateModelState = {
  payload: Joi.object({
    Name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
    Description: Joi
    .string()
    .description('Description of Class'),
    StateModelID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of StateModel')
  }).label('stateModelState'),
  failAction: logValidateError
}

const del_stateModelState = {
  params: Joi.object({
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of "itemClass"."StateModel"'),
    stateid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateID of "itemClass"."State"'),
  }),
  failAction: logValidateError
}

const get_stateModelStateTransitions = {
  params: Joi.object({
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of State Model')
  }),
  failAction: logValidateError
}

const get_stateModelStateTransitionFilterStateTransitionID = {
  params: Joi.object({
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of State Model'),
    statetransitionid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateTransitionID of StateTransition')
  }),
  failAction: logValidateError
}

const post_stateModelStateTransition = {
  payload: Joi.object({
    Name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
    Description: Joi
    .string()
    .description('Description of Class'),
    FromState: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateID of State'),
    ToState: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateID of State'),
    StateModel: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of StateModel')
  }).label('stateModelStateTransition'),
  failAction: logValidateError
}

const del_stateModelStateTransition = {
  params: Joi.object({
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelID of "itemClass"."StateModel"'),
    statetransitionid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateTransitionID of "itemClass"."StateTransitions"'),
  }),
  failAction: logValidateError
}

const get_item = {
  params: Joi.object({
    itemid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item')
  }),
  failAction: logValidateError
}

const post_item = {
  payload: Joi.object({
    Name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(45)
    .required()
    .description('Name of Class'),
    Description: Joi
    .string()
    .description('Description of Class'),
    ItemClassID: Joi
    .string()
    .alphanum()
    .description('ItemClass the Item belongs to'),
  }).label('item'),
  failAction: logValidateError
}

const del_item = {
  params: Joi.object({
    itemid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of "item"."Items"'),
  }),
  failAction: logValidateError
}

const get_itemProperties = {
  params: Joi.object({
    itemid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item')
  }),
  failAction: logValidateError
}

const get_itemPropertyFilterPropertyID = {
  params: Joi.object({
    itemid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item'),
    propertyid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('Propertyid of Property')
  }),
  failAction: logValidateError
}

const post_itemProperty = {
  payload: Joi.object({
    ItemID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item'),
    Value: Joi
    .string()
    .description('Description of Class'),
    ItemClassPropertyID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemClassPropertyID of ItemClass.Property'),
  }).label('itemProperty'),
  failAction: logValidateError
}

const put_itemProperty = {
  payload: Joi.object({
    Value: Joi
    .string()
    .description('Value of Property'),
    PropertyID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('PropertyID of Property'),
  }),
  failAction: logValidateError
}

const get_itemStateModels = {
  params: Joi.object({
    itemid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item')
  }),
  failAction: logValidateError
}

const get_itemStateModelFilterStateModelID = {
  params: Joi.object({
    itemid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item'),
    statemodelid: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('StateModelIDid of StateModel')
  }),
  failAction: logValidateError
}

const post_itemStateModel = {
  payload: Joi.object({
    ItemID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemID of Item'),
    StateID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('Actual State of Statemodel of Item Instance'),
    ItemClassStateModelID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('ItemClassStateModelID of ItemClass.StateModel'),
  }).label('itemStateModel'),
  failAction: logValidateError
}

const put_itemStateModel = {
  payload: Joi.object({
    StateID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('Actual State of Statemodel of Item Instance'),
    StateModelID: Joi
    .number()
    .integer()
    .min(1)
    .max(2147483647)
    .required()
    .description('PropertyID of Property'),
  }),
  failAction: logValidateError
}

async function logValidateError(request, h, err) {
  if (process.env.NODE_ENV === 'production') {
    // In prod, log a limited error message and throw the default Bad Request error.
    logger.error('ValidationError:', err.message); // Better to use an actual logger here.
    throw Boom.badRequest(`Invalid request payload input`);
  } else {
    // During development, log and respond with the full error.
    logger.error(err);
    throw err;
  }
}

module.exports = {
  get_hello_id,
  get_itemClass,
  post_itemClass,
  del_itemClass,

  get_itemClassProperties,
  get_itemClassProperty,
  post_itemClassProperty,
  del_itemClassProperty,

  get_itemClassStateModels,
  get_itemClassStateModel,
  post_itemClassStateModel,
  del_itemClassStateModel,

  get_stateModelStates,
  get_stateModelState,
  post_stateModelState,
  del_stateModelState,

  get_stateModelStateTransitions,
  get_stateModelStateTransitionFilterStateTransitionID,
  post_stateModelStateTransition,
  del_stateModelStateTransition,

  get_item,
  post_item,
  del_item,

  get_itemProperties,
  get_itemPropertyFilterPropertyID,
  post_itemProperty,
  put_itemProperty,

  get_itemStateModels,
  get_itemStateModelFilterStateModelID,
  post_itemStateModel,
  put_itemStateModel
};
