'use strict';

// ########## Items Class #############

// Returns all Classesin ItemClass Table
const getItemClasses = {
  query: 'SELECT * FROM ItemClass;',
  parameters: []
}

// Returns a Items filtered by ClassID
const getItemClassFilterClassId = {
  query: `SELECT * FROM Items WHERE ItemClassID = $1;`,
  parameters: []
}

// Create ItemClass -> use transactional secure
const createItemClass = {
  queries: [{
    query: "INSERT INTO ItemClass (Name, Description, Type) VALUES ( $1, $2, $3);",
    parameters: []
  }]
}

// Deletes a ItemClass by ID
const deleteItemClass = {
  queries: [{
    query: `DELETE FROM ItemClass  WHERE ItemClassID like $1;`,
    parameters: []
  }]
}

// ########## Items Class Properties #############

// Returns all Properties in  Properties Table
const getItemClassProperties = {
  query: 'SELECT * FROM Popertes;',
  parameters: []
}

// Returns a Properties filtered by PropertyId
const getItemClasssPropertiesFilterPropertyId = {
  query: `SELECT * FROM Popertes WHERE PopertyID = $1;`,
  parameters: []
}

// Create Property -> use transactional secure
const createItemClassProperty = {
  queries: [{
    query: "INSERT INTO Properties (Name, Description, Type, ItemClassID, UoM) VALUES ( $1, $2, $3, $4, $5);",
    parameters: []
  }]
}

// Deletes a Properties by ID
const deleteItemClassProperty = {
  queries: [{
    query: `DELETE FROM Properties  WHERE PropertyID like $1;`,
    parameters: []
  }]
}

// ########## Items Class StateModel #############

// Returns all StateModels in StateModel Table
const getItemClassStateModels = {
  query: 'SELECT * FROM StateModel;',
  parameters: []
}

// Returns a StateModel filtered by StateModelID
const getItemClassStateModelFilterStateModelId = {
  query: `SELECT * FROM StateModel WHERE StateModelID = $1;`,
  parameters: []
}

// Create StateModel -> use transactional secure
const createItemClassStateModel = {
  queries: [{
    query: "INSERT INTO StateModel (Name, Description, ItemClassID) VALUES ( $1, $2, $3);",
    parameters: []
  }]
}

// Deletes a StateModel by ID
const deleteItemClassStateModel = {
  queries: [{
    query: `DELETE FROM StateModel  WHERE StateModelID like $1;`,
    parameters: []
  }]
}

// ########## Items Class State #############

// Returns all States in State Table
const getItemClassStates = {
  query: 'SELECT * FROM State;',
  parameters: []
}

// Returns a State filtered by StateID
const getItemClassStateFilterStateId = {
  query: `SELECT * FROM State WHERE StateID = $1;`,
  parameters: []
}

// Create State -> use transactional secure
const createItemClassState = {
  queries: [{
    query: "INSERT INTO State (Name, Description, StateModelID) VALUES ( $1, $2, $3);",
    parameters: []
  }]
}

// Deletes a State by ID
const deleteItemClassState = {
  queries: [{
    query: `DELETE FROM State WHERE StateID like $1;`,
    parameters: []
  }]
}

// ########## Items Class State Transition #############

// Returns all StateTransitions in StateTransition Table
const getItemClassStateTransitions = {
  query: 'SELECT * FROM StateTransitions;',
  parameters: []
}

// Returns a StateTransition filtered by StateID
const getItemClassStateTranstionFilterStateTransitionId = {
  query: `SELECT * FROM StateTransitions WHERE StateTransitionID = $1;`,
  parameters: []
}

// Create StateTransition -> use transactional secure
const createItemClassStateTransition = {
  queries: [{
    query: "INSERT INTO StateTransitions (Name, Description, FromState, ToState, StateModel) VALUES ( $1, $2, $3, $4, $5);",
    parameters: []
  }]
}

// Deletes a StateTransition by ID
const deleteItemClassStateTranistion = {
  queries: [{
    query: `DELETE FROM StateTransitions WHERE StateTransitionID like $1;`,
    parameters: []
  }]
}

// ########## Items #############

// Returns all Items in Items Table
const getItems = {
  query: 'SELECT * FROM Items;',
  parameters: []
}

// Returns a Item filtered by ItemID
const getItemFilterItemId = {
  query: "SELECT * FROM Items WHERE ItemID = $1;",
  parameters: []
}

// Create Item -> use transactional secure
const createItem = {
  queries: [{
    query: 'INSERT INTO Items (Name, Description, ItemClassID) VALUES ( $1, $2, $3);',
    parameters: []
  }]
}

// Deletes a Itme by ID
const deleteItem = {
  queries: [{
    query: `DELETE FROM Items  WHERE ItemID like $1;`,
    parameters: []
  }]
}

// ########## Properties #############

// Returns all Properties in Properties Table
const getProperties = {
  query: 'SELECT * FROM Properties;',
  parameters: []
}

// Returns a Property filtered by PropertyID
const getPropertyFilterPropertyID = {
  query: `SELECT * FROM Items WHERE PropertyID = $1;`,
  parameters: []
}

// Create a Property -> use transactional secure
const createProperty = {
  queries: [{
    query: "INSERT INTO Properties (Name, Description, ItemClassID, Value, ValueType) VALUES ( $1, $2. $3. $4. $5);",
    parameters: []
  }]
}

// Deletes a Property by ID
const deleteProperty = {
  queries: [{
    query: `DELETE FROM Properties  WHERE PropertyID like $1;`,
    parameters: []
  }]
}


// ########## State Model #############

// Returns all StateModels in  StateModels Table
const getStateModels = {
  query: 'SELECT * FROM StateModels;',
  parameters: []
}

// Returns a StateModel filtered by StateModelID
const getItemsFilterClassId = {
  query: `SELECT * FROM Items WHERE StateModelID = $1;`,
  parameters: []
}

// Create StateModel -> use transactional secure
const createStateModel = {
  queries: [{
    query: "INSERT INTO StateModels (Name, Description, ItemClassID) VALUES ( $1, $2, $3);",
    parameters: []
  }]
}

// Deletes a ItemClass by ID
const deleteStateModel = {
  queries: [{
    query: `DELETE FROM StateModels  WHERE StateModelID like $1;`,
    parameters: []
  }]
}


module.exports = {
  getItemClasses,
  getItemClassFilterClassId,
  createItemClass,
  deleteItemClass,

  getItemClassProperties,
  getItemClasssPropertiesFilterPropertyId,
  createItemClassProperty,
  deleteItemClassProperty,

  getItemClassStateModels,
  getItemClassStateModelFilterStateModelId,
  createItemClassStateModel,
  deleteItemClassStateModel,

  getItemClassStates,
  getItemClassStateFilterStateId,
  createItemClassState,
  deleteItemClassState,

  getItemClassStateTransitions,
  getItemClassStateTranstionFilterStateTransitionId,
  createItemClassStateTransition,
  deleteItemClassStateTranistion,

  getItems,
  getItemFilterItemId,
  createItem,
  deleteItem,

  getProperties,
  getPropertyFilterPropertyID,
  createProperty,
  deleteProperty,

  getStateModels,
  getItemsFilterClassId,
  createStateModel,
  deleteStateModel
};