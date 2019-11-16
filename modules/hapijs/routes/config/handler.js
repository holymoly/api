'use strict';

// pgdb
const pgdb = require('../../../pgdb/pgdb');

// Load query
const query = require('../../../pgdb/query');

// Load logger
const logger = require('../../../logger/logger').logRoutes;

//password handling
const auth = require('../../auth');

// localhost:8000/
const get_root = (request, h) => {
  return replyToClient(undefined, 'welcome to the root');
}

// localhost:8000/logout
const get_logout = (request, h) => {
  request.cookieAuth.clear();
  return replyToClient(undefined, {
    authenticated: false
  });
}

// localhost:8000/hello/{id}
const get_hello_id = (request, h) => {
  return replyToClient(undefined, 'hello id: ' + request.params.id);
}

//########## Item Class #############
// localhost:8000/itemClasses
const get_itemClass = async(request, h) => {
  var result = await pgdb.query(query.getItemClasses).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClasses/{id}
const get_itemsFilterClassId = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass
const post_itemClass = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    var result = await pgdb.query(query.databases).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

// localhost:8000/itemClass
const del_itemClass = async(request, h) => {
  query.deleteUser.parameters[0] = request.query.username;
  var result = await pgdb.query(query.deleteUser).catch(errorHandling);
  return replyToClient(undefined, result);
}

//########## Item Class Properties #############
// localhost:8000/itemClasses
const get_itemsClassProperties = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClasses/{id}
const get_itemClassPropertyFilterPropertyID = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass
const post_itemClassProperty = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    var result = await pgdb.query(query.databases).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

// localhost:8000/itemClass
const del_itemClassProperty = async(request, h) => {
  query.deleteUser.parameters[0] = request.query.username;
  var result = await pgdb.query(query.deleteUser).catch(errorHandling);
  return replyToClient(undefined, result);
}

//########## Item Class State Modeö #############
// localhost:8000/itemClass/{classid}/statemodel
const get_itemsClassStateModels = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/statemodel/{statemodelid}
const get_itemsClassStateModelFilterStateModelId = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/properties/
const post_itemClassStateModel = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    var result = await pgdb.query(query.databases).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

// localhost:8000/itemClass/{classid}/statemodel/
const del_itemClassStateModel = async(request, h) => {
  query.deleteUser.parameters[0] = request.query.username;
  var result = await pgdb.query(query.deleteUser).catch(errorHandling);
  return replyToClient(undefined, result);
}

//########## Item Instances #############
// localhost:8000/items
const get_items = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{id}
const get_itemsFilterItemID = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item
const post_item = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    var result = await pgdb.query(query.databases).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

// localhost:8000/item
const del_item = async(request, h) => {
  query.deleteUser.parameters[0] = request.query.username;
  var result = await pgdb.query(query.deleteUser).catch(errorHandling);
  return replyToClient(undefined, result);
}

//########## Item Instance Properties #############
// localhost:8000/item/{itemid}/properties
const get_itemProperties = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/property/{propertyid}
const get_itemPropertyFilterPropertyId = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/property
const put_itemProperty = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    var result = await pgdb.query(query.databases).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

//########## Item Instance StateModel #############
// localhost:8000/item/{itemid}/statemodel
const get_itemStateModel = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/statemodel/{statemodelid}
const get_itemStateModelFilterStateModelId = async(request, h) => {
  var result = await pgdb.query(query.databases).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/statemodel
const post_itemStateModel = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    var result = await pgdb.query(query.databases).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

// Helper function for reply
function replyToClient(err, data) {
  if (err) {
    logger.error('Reply Error:' + err);
    return err;
  } else {
    logger.debug('Reply: ' + JSON.stringify(data));
    return data;
  }
};

function errorHandling(reason) {
  logger.error(reason);
  replyToClient(reason, undefined);
};

module.exports = {
  get_root,
  get_logout,
  get_hello_id,
  get_itemClass,
  get_itemsFilterClassId,
  post_itemClass,
  del_itemClass,
  get_itemsClassProperties,
  get_itemClassPropertyFilterPropertyID,
  post_itemClassProperty,
  del_itemClassProperty,
  get_itemsClassStateModels,
  get_itemsClassStateModelFilterStateModelId,
  post_itemClassStateModel,
  del_itemClassStateModel,
  get_items,
  get_itemsFilterItemID,
  post_item,
  del_item,
  get_itemProperties,
  get_itemPropertyFilterPropertyId,
  put_itemProperty,
  get_itemStateModel,
  get_itemStateModelFilterStateModelId,
  post_itemStateModel
};