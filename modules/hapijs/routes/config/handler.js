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

//########## ItemClass #############
// localhost:8000/itemClasses
const get_itemClass = async(request, h) => {
  var result = await pgdb.query(query.getItemClasses).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClasses/{id}
const get_itemsFilterClassID = async(request, h) => {
  var data = request.params;
  logger.debug("Query class with ClassID: " + data);
  query.getItemClassFilterClassId.parameters = [data.classid];
  var result = await pgdb.query(query.getItemClassFilterClassId).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass
const post_itemClass = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    query.createItemClass.queries[0].parameters = [data.Name, data.Description, data.Type]
    var result = await pgdb.queryTransactionSave(query.createItemClass).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

// localhost:8000/itemClass
const del_itemClass = async(request, h) => {
  var data = request.params;
  try {
    query.deleteItemClass.queries[0].parameters = [data.classid]
    var result = await pgdb.queryTransactionSave(query.deleteItemClass).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass');
  }
}

//########## ItemClass Properties #############
// localhost:8000/itemClasses
const get_itemsClassProperties = async(request, h) => {
  var data = request.params;
  logger.debug("Query ItemClass Properties with data: " + JSON.stringify(data));
  query.getItemClassPropertiesFilterItemClassID.parameters = [data.classid];
  var result = await pgdb.query(query.getItemClassPropertiesFilterItemClassID).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClasses/{id}
const get_itemClassPropertyFilterPropertyID = async(request, h) => {
  var data = request.params;
  logger.debug("Query ItemClass Properties with data: " + JSON.stringify(data));
  query.getItemClasssPropertiesFilterPropertyId.parameters = [data.propertyid, data.classid];
  var result = await pgdb.query(query.getItemClasssPropertiesFilterPropertyId).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass
const post_itemClassProperty = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass Property with data: ' + JSON.stringify(data));
  try {
    query.createItemClassProperty.queries[0].parameters = [data.Name, data.Description, data.Type, data.ItemClassID, data.UoM];
    var result = await pgdb.queryTransactionSave(query.createItemClassProperty).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

// localhost:8000/itemClass
const del_itemClassProperty = async(request, h) => {
  var data = request.params;
  logger.debug('Delete itemClass Property with data: ' + JSON.stringify(data));
  try {
    query.deleteItemClassProperty.queries[0].parameters = [data.propertyid, data.classid];
    var result = await pgdb.queryTransactionSave(query.deleteItemClassProperty).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

//########## ItemClass StateModel #############
// localhost:8000/itemClass/{classid}/statemodel
const get_itemsClassStateModels = async(request, h) => {
  var data = request.params;
  logger.debug("Query ItemClass Properties with data: " + JSON.stringify(data));
  query.getItemClassStateModelsFilterItemClassID.parameters = [data.classid];
  var result = await pgdb.query(query.getItemClassStateModelsFilterItemClassID).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/statemodel/{statemodelid}
const get_itemsClassStateModelFilterStateModelID = async(request, h) => {
  var data = request.params;
  logger.debug("Query ItemClass Properties with data: " + JSON.stringify(data));
  query.getItemClassStateModelFilterStateModelId.parameters = [data.propertyid, data.classid];
  var result = await pgdb.query(query.getItemClassStateModelFilterStateModelId).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/properties/
const post_itemClassStateModel = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass State Model with data: ' + JSON.stringify(data));
  try {
    query.createItemClassStateModel.queries[0].parameters = [data.Name, data.Description, data.ItemClassID];
    var result = await pgdb.queryTransactionSave(query.createItemClassStateModel).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

// localhost:8000/itemClass/{classid}/statemodel/
const del_itemClassStateModel = async(request, h) => {
  var data = request.params;
  logger.debug('Delete itemClass StateModel with data: ' + JSON.stringify(data));
  try {
    query.deleteItemClassStateModel.queries[0].parameters = [data.statemodelid, data.classid];
    var result = await pgdb.queryTransactionSave(query.deleteItemClassStateModel).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

//########## ItemClass StateModel State #############
// localhost:8000/itemClass/{classid}/statemodel
const get_stateModelStates = async(request, h) => {
  var data = request.params;
  logger.debug("Query State Properties with data: " + JSON.stringify(data));
  query.getStateModelStates.parameters = [data.statemodelid];
  var result = await pgdb.query(query.getStateModelStates).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/statemodel/{statemodelid}
const get_stateModelStateFilterStateID = async(request, h) => {
  var data = request.params;
  logger.debug("Query State Properties with data: " + JSON.stringify(data));
  query.getStateModelStateFilterStateID.parameters = [data.stateid, data.statemodelid];
  var result = await pgdb.query(query.getStateModelStateFilterStateID).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/properties/
const post_stateModelState = async(request, h) => {
  var data = request.payload;
  logger.debug('Create State with data: ' + JSON.stringify(data));
  try {
    query.createStateModelState.queries[0].parameters = [data.Name, data.Description, data.StateModelID];
    var result = await pgdb.queryTransactionSave(query.createStateModelState).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

// localhost:8000/itemClass/{classid}/statemodel/
const del_stateModelState = async(request, h) => {
  var data = request.params;
  logger.debug('Delete State with data: ' + JSON.stringify(data));
  try {
    query.deleteStateModelState.queries[0].parameters = [data.stateid, data.statemodelid];
    var result = await pgdb.queryTransactionSave(query.deleteStateModelState).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}




//########## ItemClass StateModel StateTransitions #############
// localhost:8000/itemClass/{classid}/statemodel
const get_stateModelStateTransitions = async(request, h) => {
  var data = request.params;
  logger.debug("Query State Transition with data: " + JSON.stringify(data));
  query.getStateModelStateTransitions.parameters = [data.statemodelid];
  var result = await pgdb.query(query.getStateModelStateTransitions).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/statemodel/{statemodelid}
const get_stateModelStateTransitionFilterStateTransitionID = async(request, h) => {
  var data = request.params;
  logger.debug("Query State Properties with data: " + JSON.stringify(data));
  query.getStateModelStateTranstionFilterStateTransitionId.parameters = [data.statetransitionid, data.statemodelid];
  var result = await pgdb.query(query.getStateModelStateTranstionFilterStateTransitionId).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/itemClass/{classid}/properties/
const post_stateModelStateTransition = async(request, h) => {
  var data = request.payload;
  logger.debug('Create State with data: ' + JSON.stringify(data));
  try {
    query.createStateModelStateTransition.queries[0].parameters = [data.Name, data.Description, data.FromState, data.ToState, data.StateModel];
    var result = await pgdb.queryTransactionSave(query.createStateModelStateTransition).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

// localhost:8000/itemClass/{classid}/statemodel/
const del_stateModelStateTransition = async(request, h) => {
  var data = request.params;
  logger.debug('Delete State with data: ' + JSON.stringify(data));
  try {
    query.deleteStateModelStateTranistion.queries[0].parameters = [data.statetransitionid, data.statemodelid];
    var result = await pgdb.queryTransactionSave(query.deleteStateModelStateTranistion).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create itemClass property');
  }
}

//########## Item Instances #############
// localhost:8000/items
const get_items = async(request, h) => {
  var result = await pgdb.query(query.getItems).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{id}
const get_itemsFilterItemID = async(request, h) => {
  var data = request.params;
  logger.debug("Query Item with data: " + JSON.stringify(data));
  query.getItemFilterItemId.parameters = [data.itemid];
  var result = await pgdb.query(query.getItemFilterItemId).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item
const post_item = async(request, h) => {
  var data = request.payload;
  logger.debug('Create itemClass with data: ' + JSON.stringify(data));
  try {
    query.createItem.queries[0].parameters = [data.Name, data.Description, data.ItemClassID];
    var result = await pgdb.queryTransactionSave(query.createItem).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create item');
  }
}

// localhost:8000/item
const del_item = async(request, h) => {
  var data = request.params;
  logger.debug('Delete Item with data: ' + JSON.stringify(data));
  try {
    query.deleteItem.queries[0].parameters = [data.itemid];
    var result = await pgdb.queryTransactionSave(query.deleteItem).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create item');
  }
}

//########## Item Instance Properties #############
// localhost:8000/item/{itemid}/properties
const get_itemProperties = async(request, h) => {
  var data = request.params;
  logger.debug("Query Item Properties with data: " + JSON.stringify(data));
  query.getItemProperties.parameters = [data.itemid];
  var result = await pgdb.query(query.getItemProperties).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/property/{propertyid}
const get_itemPropertyFilterPropertyID = async(request, h) => {
  var data = request.params;
  logger.debug("Query Item Properties with data: " + JSON.stringify(data));
  query.getItemPropertyFilterPropertyID.parameters = [data.propertyid, data.itemid];
  var result = await pgdb.query(query.getItemPropertyFilterPropertyID).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item
const post_itemProperty = async(request, h) => {
  var data = request.payload;
  logger.debug('Create item property with data: ' + JSON.stringify(data));
  try {
    query.createItemProperty.queries[0].parameters = [data.ItemID, data.Value, data.ItemClassPropertyID];
    var result = await pgdb.queryTransactionSave(query.createItemProperty).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create item property');
  }
}

// localhost:8000/item/{itemid}/property
const put_itemProperty = async(request, h) => {
  var data = request.payload;
  logger.debug('Update item property with data: ' + JSON.stringify(data));
  try {
    query.updateItemProperty.queries[0].parameters = [data.Value, data.PropertyID];
    var result = await pgdb.queryTransactionSave(query.updateItemProperty).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create item property');
  }
}

//########## Item Instance StateModel #############
// localhost:8000/item/{itemid}/statemodel
const get_itemStateModel = async(request, h) => {
  var data = request.params;
  logger.debug("Query Item StateModels with data: " + JSON.stringify(data));
  query.getItemStateModels.parameters = [data.itemid];
  var result = await pgdb.query(query.getItemStateModels).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/statemodel/{statemodelid}
const get_itemStateModelFilterStateModelID = async(request, h) => {
  var data = request.params;
  logger.debug("Query Item StateModel with data: " + JSON.stringify(data));
  query.getItemStateModelFilterStateModelID.parameters = [data.statemodelid, data.itemid];
  var result = await pgdb.query(query.getItemStateModelFilterStateModelID).catch(errorHandling);
  return replyToClient(undefined, result);
}

// localhost:8000/item/{itemid}/statemodel
const post_itemStateModel = async(request, h) => {
  var data = request.payload;
  logger.debug('Create item statemodel with data: ' + JSON.stringify(data));
  try {
    query.createItemStateModel.queries[0].parameters = [data.ItemClassStateModelID, data.StateID, data.ItemID, ];
    var result = await pgdb.queryTransactionSave(query.createItemStateModel).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create item statemodel');
  }
}

// localhost:8000/item/{itemid}/property
const put_itemStateModel = async(request, h) => {
  var data = request.payload;
  logger.debug('Update item StatMoedel with data: ' + JSON.stringify(data));
  try {
    query.updateItemStateModel.queries[0].parameters = [data.StateID, data.PropertyID];
    var result = await pgdb.queryTransactionSave(query.updateItemStateModel).catch(errorHandling);
    return replyToClient(undefined, result);
  } catch (err) {
    return replyToClient(err, 'cannot create item statemodel');
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
  get_itemsFilterClassID,
  post_itemClass,
  del_itemClass,

  get_itemsClassProperties,
  get_itemClassPropertyFilterPropertyID,
  post_itemClassProperty,
  del_itemClassProperty,

  get_itemsClassStateModels,
  get_itemsClassStateModelFilterStateModelID,
  post_itemClassStateModel,
  del_itemClassStateModel,

  get_stateModelStates,
  get_stateModelStateFilterStateID,
  post_stateModelState,
  del_stateModelState,

  get_stateModelStateTransitions,
  get_stateModelStateTransitionFilterStateTransitionID,
  post_stateModelStateTransition,
  del_stateModelStateTransition,

  get_items,
  get_itemsFilterItemID,
  post_item,
  del_item,

  get_itemProperties,
  get_itemPropertyFilterPropertyID,
  post_itemProperty,
  put_itemProperty,

  get_itemStateModel,
  get_itemStateModelFilterStateModelID,
  post_itemStateModel,
  put_itemStateModel
};