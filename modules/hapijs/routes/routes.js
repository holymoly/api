'use strict';

// Load logger
const logger = require('../../logger/logger').logRoutes;

// Load sql queries
const handler = require('./config/handler');

// Load auth config
const auth = require('./config/auth');

// Load validation
const validate = require('./config/validate');

// Export all routes to other modules
module.exports = [
  // localhost:8000/
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handler.get_root,
      description: 'answer if root path was called',
      notes: 'Returns "welcome to the root"',
      tags: ['api'], // Tags for swagger
    }
  },

  // localhost:8000/logout
  {
    method: 'GET',
    path: '/logout',
    config: {
      handler: handler.get_logout,
      description: 'Used for initial authentification',
      notes: `Clears the cookie session`,
      tags: ['api', 'auth', 'scope'], // Tags for swagger
    }
  },

  // localhost:8000/hello/{id}
  {
    method: 'GET',
    path: '/hello/{id}',
    config: {
      handler: handler.get_hello_id,
      auth: auth.item_guest,
      description: 'Get back id',
      notes: 'Returns the passed {id}',
      tags: ['api'], // Tags for swagger
      validate: validate.get_hello_id
    }
  },

  //########## Item Class #############
  // localhost:8000/itemClasses
  {
    method: 'GET',
    path: '/itemClasses',
    config: {
      handler: handler.get_itemClass,
      auth: auth.item_guest,
      description: 'Get all item classes',
      notes: 'Returns all item classes',
      tags: ['api', 'items', 'database', 'class'], // Tags for swagger
    }
  },

  // localhost:8000/itemClass/{id}
  {
    method: 'GET',
    path: '/itemClass/{id}',
    config: {
      handler: handler.get_itemsFilterClassId,
      auth: auth.item_guest,
      description: 'Get item class by id',
      notes: 'Returns item class filtered by id',
      tags: ['api', 'items', 'database', 'class'], // Tags for swagger
    }
  },

  // localhost:8000/itemClass
  {
    method: 'POST',
    path: '/itemClass',
    config: {
      handler: handler.post_itemClass,
      auth: auth.item_admin,
      description: 'Create a item class',
      notes: 'Creates item class ',
      tags: ['api', 'item', 'database', 'class'], // Tags for swagger
      validate: validate.post_itemClass
    }
  },

  // localhost:8000/itemClass
  {
    method: 'DELETE',
    path: '/itemClass',
    config: {
      handler: handler.del_itemClass,
      auth: auth.item_admin,
      description: 'Deletes a item class by id',
      notes: 'Deletes a item class by id',
      tags: ['api', 'item', 'database', 'class'], // Tags for swagger
      validate: validate.del_itemClass
    }
  },

  //########## Item Class Prperties ############
  // localhost:8000/itemClass/properties
  {
    method: 'GET',
    path: '/itemClass/{classid}/properties',
    config: {
      handler: handler.get_itemsClassProperties,
      auth: auth.item_guest,
      description: 'Get all properties for item class',
      notes: 'Returns all item classes properties for class defined by {classid}',
      tags: ['api', 'items', 'database', 'class', 'properties'], // Tags for swagger
    }
  },

  // localhost:8000/itemClass/{classid}/properties/{propertyID}
  {
    method: 'GET',
    path: '/itemClass/{classid}/property/{propertyid}',
    config: {
      handler: handler.get_itemClassPropertyFilterPropertyID,
      auth: auth.item_guest,
      description: 'Get item class property by id',
      notes: 'Returns item class filtered by propertyid and classid',
      tags: ['api', 'items', 'database', 'class', 'properties'], // Tags for swagger
    }
  },

  // localhost:8000/itemClass/{classid}/property/
  {
    method: 'POST',
    path: '/itemClass/{classid}/property/',
    config: {
      handler: handler.post_itemClassProperty,
      auth: auth.item_admin,
      description: 'Create a property for a specific class',
      notes: 'Create a property for a specific class',
      tags: ['api', 'item', 'database', 'instance', 'properties'], // Tags for swagger
      validate: validate.post_itemClassProperty
    }
  },

  // localhost:8000/itemClass/{classid}/property/
  {
    method: 'DELETE',
    path: '/itemClass/{classid}/property/',
    config: {
      handler: handler.del_itemClassProperty,
      auth: auth.item_admin,
      description: 'Deletes a property for a specific class',
      notes: 'Deletes a property for a specific class',
      tags: ['api', 'item', 'database', 'instance', 'properties'], // Tags for swagger
      validate: validate.del_itemClassProperty
    }
  },

  //########## Item Class State Model #############
  // localhost:8000/itemClass/{classid}/statemodel
  {
    method: 'GET',
    path: '/itemClass/{classid}/statemodels',
    config: {
      handler: handler.get_itemsClassStateModels,
      auth: auth.item_guest,
      description: 'Get all state models for item class',
      notes: 'Returns all state models for class defined by {classid}',
      tags: ['api', 'items', 'database', 'class', 'state'], // Tags for swagger
    }
  },

  // localhost:8000/itemClass/{classid}/statemodel/{statemodelid}
  {
    method: 'GET',
    path: '/itemClass/{classid}/statemodel/{statemodelid}',
    config: {
      handler: handler.get_itemsClassStateModelFilterStateModelId,
      auth: auth.item_guest,
      description: 'Get state model for item class filetered by {statemodelid}',
      notes: 'Returns state model for item class filetered by {statemodelid}',
      tags: ['api', 'items', 'database', 'class', 'state'], // Tags for swagger
    }
  },

  // localhost:8000/itemClass/{classid}/properties/
  {
    method: 'POST',
    path: '/itemClass/{classid}/statemodel',
    config: {
      handler: handler.post_itemClassStateModel,
      auth: auth.item_admin,
      description: 'Create a StateModel for a specific class',
      notes: 'Create a StateModel for a specific class',
      tags: ['api', 'item', 'database', 'instance', 'state'], // Tags for swagger
      validate: validate.post_itemClassStateModel
    }
  },

  // localhost:8000/itemClass/{classid}/statemodel/
  {
    method: 'DELETE',
    path: '/itemClass/{classid}/statemodel/',
    config: {
      handler: handler.del_itemClassStateModel,
      auth: auth.item_admin,
      description: 'Deletes a StateModel for a specific class',
      notes: 'Deletes a StateModel for a specific class',
      tags: ['api', 'item', 'database', 'instance', 'state'], // Tags for swagger
      validate: validate.del_itemClassStateModel
    }
  },

  //########## Item Instance #############
  // localhost:8000/items
  {
    method: 'GET',
    path: '/items',
    config: {
      handler: handler.get_items,
      auth: auth.item_guest,
      description: 'Get all items',
      notes: 'Returns all items',
      tags: ['api', 'items', 'database', 'instance'], // Tags for swagger
    }
  },

  // localhost:8000/item/{id}
  {
    method: 'GET',
    path: '/item/{id}',
    config: {
      handler: handler.get_itemsFilterItemID,
      auth: auth.item_guest,
      description: 'Get item by id',
      notes: 'Returns item filtered by id',
      tags: ['api', 'items', 'database', 'instance'], // Tags for swagger
    }
  },

  // localhost:8000/item
  {
    method: 'POST',
    path: '/item',
    config: {
      handler: handler.post_item,
      auth: auth.item_admin,
      description: 'Create a item',
      notes: 'Creates item based on item class',
      tags: ['api', 'item', 'database', 'instance'], // Tags for swagger
      validate: validate.post_user
    }
  },

  // localhost:8000/item
  {
    method: 'DELETE',
    path: '/item',
    config: {
      handler: handler.del_item,
      auth: auth.item_admin,
      description: 'Deletes a item by id',
      notes: 'Deletes a item by id',
      tags: ['api', 'item', 'database', 'instance'], // Tags for swagger
      validate: validate.del_item
    }
  },

  //########## Item Instance Properties #############
  // localhost:8000/item/{itemid}/properties
  {
    method: 'GET',
    path: '/item/{itemid}/properties',
    config: {
      handler: handler.get_itemProperties,
      auth: auth.item_guest,
      description: 'Get all properties for a items',
      notes: 'Returns all properties for a items',
      tags: ['api', 'items', 'database', 'instance', 'property'], // Tags for swagger
    }
  },

  // localhost:8000/item/{itemid}/property/{propertyid}
  {
    method: 'GET',
    path: '/item/{itemid}/property/{propertyid}',
    config: {
      handler: handler.get_itemPropertyFilterPropertyId,
      auth: auth.item_guest,
      description: 'Get a specific property for a item',
      notes: 'Returns a specific property for a item',
      tags: ['api', 'items', 'database', 'instance', 'property'], // Tags for swagger
    }
  },

  // localhost:8000/item/{itemid}/property
  {
    method: 'PUT',
    path: '/item/{itemid}/property',
    config: {
      handler: handler.put_itemProperty,
      auth: auth.item_admin,
      description: 'Update a property for a specific item',
      notes: 'Update item based on item class',
      tags: ['api', 'item', 'database', 'instance', 'property'], // Tags for swagger
      validate: validate.put_itemProperty
    }
  },

  //########## Item Instance StateModel #############
  // localhost:8000/item/{itemid}/statemodel
  {
    method: 'GET',
    path: '/item/{itemid}/statemodel',
    config: {
      handler: handler.get_itemStateModel,
      auth: auth.item_guest,
      description: 'Get all statemodel for a items',
      notes: 'Returns all statemodel for a items',
      tags: ['api', 'items', 'database', 'instance', 'state'], // Tags for swagger
    }
  },

  // localhost:8000/item/item/{itemid}/statemodel/{statemodelid}
  {
    method: 'GET',
    path: '/item/{itemid}/statemodel/{statemodelid}',
    config: {
      handler: handler.get_itemStateModelFilterStateModelId,
      auth: auth.item_guest,
      description: 'Get a specific statemodelid for a item',
      notes: 'Returns a specific statemodelid for a item',
      tags: ['api', 'items', 'database', 'instance', 'state'], // Tags for swagger
    }
  },

  // localhost:8000/item/{itemid}/statemodel
  {
    method: 'PUT',
    path: '/item/{itemid}/statemodel',
    config: {
      handler: handler.post_itemStateModel,
      auth: auth.item_admin,
      description: 'Update a statemodel for a specific item',
      notes: 'Update statemodel based on item class',
      tags: ['api', 'item', 'database', 'instance', 'state'], // Tags for swagger
      validate: validate.post_itemStateModel
    }
  },
]