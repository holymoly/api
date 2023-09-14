'use strict';

// ########## Users       #############

// Returns a Hash filtered by email
var getHashByUsername = {
  query: `SELECT hash FROM users.passwords WHERE username like $1;`,
  parameters: []
}

// Returns a Hash filtered by email
var getUserGroup = {
  query: `SELECT isGuest,isUser,isAdmin FROM users.groups WHERE username = $1;`,
  parameters: []
}

// ########## Items Class #############

// Returns all Classesin ItemClass Table
const getItemClasses = {
  query: 'SELECT * FROM "itemClass"."ItemClass";',
  parameters: []
}

// Returns a Items filtered by ClassID
const getItemClassFilterClassName= {
  query: `SELECT * FROM "itemClass"."ItemClass" WHERE "Name" = $1;`,
  parameters: []
}

// Create ItemClass -> use transactional secure
const createItemClass = {
  queries: [{
    query: `INSERT INTO "itemClass"."ItemClass" ("Name", "Description", "Type") VALUES ( $1, $2, $3);`,
    parameters: []
  }]
}

// Deletes a ItemClass by ID
const deleteItemClass = {
  queries: [{
    query: `DELETE FROM "itemClass"."ItemClass" WHERE "ItemClassID" = $1;`,
    parameters: []
  }]
}

// ########## Items Class Properties #############

// Returns all Properties in  Properties Table
const getItemClassPropertiesFilterItemClassID = {
  query: 'SELECT * FROM "itemClass"."Properties" WHERE "ItemClassID" = $1;',
  parameters: []
}

// Returns a Properties filtered by PropertyId
const getItemClasssPropertiesFilterPropertyID = {
  query: `SELECT * FROM "itemClass"."Properties" WHERE "PropertyID" = $1 AND "ItemClassID" = $2;`,
  parameters: []
}

// Create Property -> use transactional secure
const createItemClassProperty = {
  queries: [{
    query: `INSERT INTO "itemClass"."Properties" ("Name", "Description", "Type", "ItemClassID", "UoM") VALUES ( $1, $2, $3, $4, $5);`,
    parameters: []
  }]
}

// Deletes a Properties by ID
const deleteItemClassProperty = {
  queries: [{
    query: `DELETE FROM "itemClass"."Properties"  WHERE "PropertyID" = $1 AND "ItemClassID" = $2;`,
    parameters: []
  }]
}

// ########## Items Class StateModel #############

// Returns all StateModels in StateModel Table
const getItemClassStateModelsFilterItemClassID = {
  query: 'SELECT * FROM "itemClass"."StateModel" WHERE "ItemClassID" = $1;',
  parameters: []
}

// Returns a StateModel filtered by StateModelID
const getItemClassStateModelFilterStateModelID = {
  query: `SELECT * FROM "itemClass"."StateModel" WHERE "StateModelID" = $1 AND "ItemClassID" = $2;`,
  parameters: []
}

// Create StateModel -> use transactional secure
const createItemClassStateModel = {
  queries: [{
    query: `INSERT INTO "itemClass"."StateModel" ("Name", "Description", "ItemClassID") VALUES ( $1, $2, $3);`,
    parameters: []
  }]
}

// Deletes a StateModel by ID
const deleteItemClassStateModel = {
  queries: [{
    query: `DELETE FROM "itemClass"."StateModel"  WHERE "StateModelID" = $1 AND "ItemClassID" = $2;`,
    parameters: []
  }]
}


// ########## StateModel State #############

// Returns all States in State Table
const getStateModelStates = {
  query: 'SELECT * FROM "itemClass"."State" WHERE "StateModelID" = $1;',
  parameters: []
}

// Returns a State filtered by StateID
const getStateModelStateFilterStateID = {
  query: `SELECT * FROM "itemClass"."State" WHERE "StateID" = $1 AND "StateModelID" = $2;`,
  parameters: []
}

// Create State -> use transactional secure
const createStateModelState = {
  queries: [{
    query: `INSERT INTO "itemClass"."State" ("Name", "Description", "StateModelID") VALUES ( $1, $2, $3);`,
    parameters: []
  }]
}

// Deletes a State by ID
const deleteStateModelState = {
  queries: [{
    query: `DELETE FROM "itemClass"."State" WHERE "StateID" = $1 AND "StateModelID" = $2;`,
    parameters: []
  }]
}

// ########## Items Class State Transition #############

// Returns all StateTransitions in StateTransition Table
const getStateModelStateTransitions = {
  query: 'SELECT * FROM "itemClass"."StateTransitions" WHERE "StateModelID" = $1;',
  parameters: []
}

// Returns a StateTransition filtered by StateID
const getStateModelStateTranstionFilterStateTransitionId = {
  query: `SELECT * FROM "itemClass"."StateTransitions" WHERE "StateTransitionID" = $1 AND "StateModelID" = $2;`,
  parameters: []
}

// Create StateTransition -> use transactional secure
const createStateModelStateTransition = {
  queries: [{
    query: `INSERT INTO "itemClass"."StateTransitions" ("Name", "Description", "FromStateID", "ToStateID", "StateModelID") VALUES ( $1, $2, $3, $4, $5);`,
    parameters: []
  }]
}

// Deletes a StateTransition by ID
const deleteStateModelStateTranistion = {
  queries: [{
    query: `DELETE FROM "itemClass"."StateTransitions" WHERE "StateTransitionID" = $1 AND "StateModelID" = $2;;`,
    parameters: []
  }]
}

// ########## Items #############

// Returns all Items in Items Table
const getItems = {
  query: 'SELECT * FROM "items"."Items";',
  parameters: []
}

// Returns a Item filtered by ItemID
const getItemFilterItemId = {
  query: `SELECT * FROM "items"."Items" WHERE "ItemID" = $1;`,
  parameters: []
}

// Create Item -> use transactional secure
const createItem = {
  queries: [{
    query: 'INSERT INTO "items"."Items" ("Name", "Description", "ItemClassID") VALUES ( $1, $2, $3);',
    parameters: []
  }]
}

// Deletes a Itme by ID
const deleteItem = {
  queries: [{
    query: `DELETE FROM "items"."Items" WHERE "ItemID" = $1;`,
    parameters: []
  }]
}

// ########## Properties #############

// Returns all Properties in Properties Table
const getItemProperties = {
  query: 'SELECT * FROM "items"."Properties" WHERE "ItemID" = $1;',
  parameters: []
}

// Returns a Property filtered by PropertyID
const getItemPropertyFilterPropertyID = {
  query: `SELECT * FROM "items"."Properties" WHERE "PropertyID" = $1 AND "ItemID" = $2;`,
  parameters: []
}

// Create a Property -> use transactional secure
const createItemProperty = {
  queries: [{
    query: `INSERT INTO "items"."Properties" ("ItemID", "Value", "ItemClassPropertyID") VALUES ( $1, $2, $3);`,
    parameters: []
  }]
}

// Create a Property -> use transactional secure
const updateItemProperty = {
  queries: [{
    query: `UPDATE "items"."Properties" SET "Value" = $1 WHERE "PropertyID" = $2;`,
    parameters: []
  }]
}

// ########## State Model #############

// Returns all StateModels in  StateModels Table
const getItemStateModels = {
  query: 'SELECT * FROM "items"."StateModels" WHERE "ItemID" = $1;',
  parameters: []
}

// Returns a StateModel filtered by StateModelID
const getItemStateModelFilterStateModelID = {
  query: `SELECT * FROM "items"."StateModels" WHERE "StateModelID" = $1 AND "ItemID" = $2;`,
  parameters: []
}

// Create StateModel -> use transactional secure
const createItemStateModel = {
  queries: [{
    query: `INSERT INTO "items"."StateModels" ("ItemClassStateModelID", "StateID", "ItemID") VALUES ( $1, $2, $3);`,
    parameters: []
  }]
}

// Deletes a ItemClass by ID
const updateItemStateModel = {
  queries: [{
    query: `UPDATE "items"."StateModels" SET "State" = $1 WHERE "PropertyID" = $2;`,
    parameters: []
  }]
}


module.exports = {

  getHashByUsername,
  getUserGroup,

  getItemClasses,
  getItemClassFilterClassName,
  createItemClass,
  deleteItemClass,

  getItemClassPropertiesFilterItemClassID,
  getItemClasssPropertiesFilterPropertyID,
  createItemClassProperty,
  deleteItemClassProperty,

  getItemClassStateModelsFilterItemClassID,
  getItemClassStateModelFilterStateModelID,
  createItemClassStateModel,
  deleteItemClassStateModel,

  getStateModelStates,
  getStateModelStateFilterStateID,
  createStateModelState,
  deleteStateModelState,

  getStateModelStateTransitions,
  getStateModelStateTranstionFilterStateTransitionId,
  createStateModelStateTransition,
  deleteStateModelStateTranistion,

  getItems,
  getItemFilterItemId,
  createItem,
  deleteItem,

  getItemProperties,
  getItemPropertyFilterPropertyID,
  createItemProperty,
  updateItemProperty,

  getItemStateModels,
  getItemStateModelFilterStateModelID,
  createItemStateModel,
  updateItemStateModel
};
