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
  handler: handler.get_root,
  options: {
      tags: ['api', 'alive'], // Tags for swagger
      description: 'answer if root path was called',
      notes: 'Returns "welcome to the root"',
      cors: true
    }
  },

  // localhost:8000/logout
  {
    method: 'GET',
    path: '/logout',
    handler: handler.get_logout,
    options: {
      tags: ['api', 'auth'], // Tags for swagger
      description: 'Used for initial authentification',
      notes: `Clears the cookie session`,
      cors: true
    }
  },

  // localhost:8000/hello/{id}
  {
    method: 'GET',
    path: '/hello/{id}',
    handler: handler.get_hello_id,
    options: {
      tags: ['api'], // Tags for swagger
      auth: auth.item_guest,
      description: 'Get back id',
      notes: 'Returns the passed {id}',
      validate: validate.get_hello_id,
      cors: true
    }
  },

  //########## Item Class #############
  // localhost:8000/itemClasses
  {
    method: 'GET',
    path: '/itemClasses',
    handler: handler.get_itemClass,
    options: {
      tags: ['api', 'ItemClass'], // Tags for swagger
      auth: auth.item_admin,
      description: 'Get all item classes',
      notes: 'Returns all item classes',
      cors: true
    }
  },

  // localhost:8000/itemClass/{id}
  {
    method: 'GET',
    path: '/itemClass/{classid}',
    handler: handler.get_itemsFilterClassID,
    options: {
      tags: ['api', 'ItemClass'], // Tags for swagger
      auth: auth.item_guest,
      description: 'Get item class by id',
      notes: 'Returns item class filtered by id',
      validate: validate.get_itemClass,
      cors: true
    }
  },

  // localhost:8000/itemClass
  {
    method: 'POST',
    path: '/itemClass',
    handler: handler.post_itemClass,
    options: {
      tags: ['api', 'ItemClass'], // Tags for swagger
      //auth: auth.item_guest,
      description: 'Create a item class',
      notes: 'Creates item class ',
      validate: validate.post_itemClass,
      cors: true
    }
  },

  // localhost:8000/itemClass
  {
    method: 'DELETE',
    path: '/itemClass/{classid}',
    handler: handler.del_itemClass,
    options: {
      tags: ['api', 'ItemClass'], // Tags for swagger
      auth: auth.item_admin,
      description: 'Deletes a item class by id',
      notes: 'Deletes a item class by id',
      validate: validate.del_itemClass,
      cors: true
    }
  },

  //########## Item Class Prperties ############
  // localhost:8000/itemClass/properties
  {
    method: 'GET',
    path: '/itemClass/{classid}/properties',
    handler: handler.get_itemsClassProperties,
    options: {
      tags: ['api', 'ItemClassProperties'], // Tags for swagger
      auth: auth.item_guest,
      description: 'Get all properties for item class',
      notes: 'Returns all properties for class defined by {classid}',
      validate: validate.get_itemClassProperties,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/properties/{propertyID}
  {
    method: 'GET',
    path: '/itemClass/{classid}/property/{propertyid}',
    handler: handler.get_itemClassPropertyFilterPropertyID,
    options: {
      tags: ['api', 'ItemClassProperties'], // Tags for swagger
      auth: auth.item_guest,
      description: 'Get item class property by id',
      notes: 'Returns item class filtered by propertyid and classid',
      validate: validate.get_itemClassProperty,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/property/
  {
    method: 'POST',
    path: '/itemClass/{classid}/property/',
    handler: handler.post_itemClassProperty,
    options: {
      tags: ['api', 'ItemClassProperties'], // Tags for swagger
      //auth: auth.item_guest,
      description: 'Create a property for a specific class',
      notes: 'Create a property for a specific class',
      validate: validate.post_itemClassProperty,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/property/
  {
    method: 'DELETE',
    path: '/itemClass/{classid}/property/{propertyid}',
    handler: handler.del_itemClassProperty,
    options: {
      tags: ['api', 'ItemClassProperties'], // Tags for swagger
      //auth: auth.item_admin,
      description: 'Deletes a property for a specific class',
      notes: 'Deletes a property for a specific class',
      validate: validate.del_itemClassProperty,
      cors: true
    }
  },

  //########## ItemClass StateModel #############
  // localhost:8000/itemClass/{classid}/statemodel
  {
    method: 'GET',
    path: '/itemClass/{classid}/statemodels',
    handler: handler.get_itemsClassStateModels,
    options: {
      tags: ['api', 'ItemClassStateModel'], // Tags for swagger
      //auth: auth.item_guest,
      description: 'Get all state models for item class',
      notes: 'Returns all state models for class defined by {classid}',
      validate: validate.get_itemClassStateModels,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/statemodel/{statemodelid}
  {
    method: 'GET',
    path: '/itemClass/{classid}/statemodel/{statemodelid}',
    handler: handler.get_itemsClassStateModelFilterStateModelID,
    options: {
      tags: ['api', 'ItemClassStateModel'],
      //auth: auth.item_guest,
      description: 'Get state model for item class filetered by {statemodelid}',
      notes: 'Returns state model for item class filetered by {statemodelid}',
      validate: validate.get_itemClassStateModel,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/properties/
  {
    method: 'POST',
    path: '/itemClass/{classid}/statemodel',
    handler: handler.post_itemClassStateModel,
    options: {
      tags: ['api', 'ItemClassStateModel'],
      //auth: auth.item_guest,
      description: 'Create a StateModel for a specific class',
      notes: 'Create a StateModel for a specific class', // Tags for swagger
      validate: validate.post_itemClassStateModel,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/statemodel/
  {
    method: 'DELETE',
    path: '/itemClass/{classid}/statemodel/{statemodelid}',
    handler: handler.del_itemClassStateModel,
    options: {
      tags: ['api', 'ItemClassStateModel'],
      //auth: auth.item_guest,
      description: 'Deletes a StateModel for a specific class',
      notes: 'Deletes a StateModel for a specific class',
      validate: validate.del_itemClassStateModel,
      cors: true
    }
  },

  //##########  StateModel State #############
  // localhost:8000/itemClass/{classid}/statemodel
  {
    method: 'GET',
    path: '/statemodels/{statemodelid}/states',
    handler: handler.get_stateModelStates,
    options: {
      tags: ['api', 'ItemClassState'],
      //auth: auth.item_guest,
      description: 'Get all state for State Model',
      notes: 'Returns all state for state model by {statemodelid}',
      validate: validate.get_stateModelStates,
      cors: true
    }
  },

  // localhost:8000/statemodels/{statemodelid}/state/{stateid}
  {
    method: 'GET',
    path: '/statemodels/{statemodelid}/state/{stateid}',
    handler: handler.get_stateModelStateFilterStateID,
    options: {
      tags: ['api', 'ItemClassState'],
      //auth: auth.item_guest,
      description: 'Get state for State Model filetered by {stateid}',
      notes: 'Returns state for state model filetered by {stateid}',
      validate: validate.get_stateModelState,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/properties/
  {
    method: 'POST',
    path: '/statemodels/{statemodelid}/state',
    handler: handler.post_stateModelState,
    options: {
      tags: ['api', 'ItemClassState'],
      //auth: auth.item_guest,
      description: 'Create a Statel for a specific State Model',
      notes: 'Create a State for a specific State Models',
      validate: validate.post_stateModelState,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/statemodel/
  {
    method: 'DELETE',
    path: '/statemodels/{statemodelid}/state/{stateid}',
    handler: handler.del_stateModelState,
    options: {
      tags: ['api', 'ItemClassState'],
      //auth: auth.item_guest,
      description: 'Deletes a State for a specific State Model',
      notes: 'Deletes a State for a specific State Model',
      validate: validate.del_stateModelState,
      cors: true
    }
  },


  //##########  StateModel StateTransistions #############
  // localhost:8000/itemClass/{classid}/statemodel
  {
    method: 'GET',
    path: '/statemodels/{statemodelid}/statetransitions',
    handler: handler.get_stateModelStateTransitions,
    options: {
      tags: ['api', 'ItemClassStateTransition'],
      //auth: auth.item_guest,
      description: 'Get all StateTransitions for State Model',
      notes: 'Returns all StateTransitions for state model by {statemodelid}',
      validate: validate.get_stateModelStateTransitions,
      cors: true
    }
  },

  // localhost:8000/statemodels/{statemodelid}/state/{stateid}
  {
    method: 'GET',
    path: '/statemodels/{statemodelid}/statetransition/{statetransitionid}',
    handler: handler.get_stateModelStateTransitionFilterStateTransitionID,
    options: {
      tags: ['api', 'ItemClassStateTransition'],
      //auth: auth.item_guest,
      description: 'Get state transition for State Model filetered by {statetransitionid}',
      notes: 'Returns state transition for state model filetered by {statetransitionid}',
      validate: validate.get_stateModelStateTransitionFilterStateTransitionID,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/properties/
  {
    method: 'POST',
    path: '/statemodels/{statemodelid}/statetransition',
    handler: handler.post_stateModelStateTransition,
    options: {
      tags: ['api', 'ItemClassStateTransition'],
      //auth: auth.item_guest,
      description: 'Create a State Transition for a specific State Model',
      notes: 'Create a State Transition for a specific State Models',
      validate: validate.post_stateModelStateTransition,
      cors: true
    }
  },

  // localhost:8000/itemClass/{classid}/statemodel/
  {
    method: 'DELETE',
    path: '/statemodels/{statemodelid}/statetransition/{statetransitionid}',
    handler: handler.del_stateModelStateTransition,
    options: {
      tags: ['api', 'ItemClassStateTransition'],
      //auth: auth.item_guest,
      description: 'Deletes a State Transition for a specific State Model',
      notes: 'Deletes a State Transition for a specific State Model',
      validate: validate.del_stateModelStateTransition,
      cors: true
    }
  },

  //########## Item Instance #############
  // localhost:8000/items
  {
    method: 'GET',
    path: '/items',
    handler: handler.get_items,
    options: {
      //auth: auth.item_guest,
      description: 'Get all items',
      notes: 'Returns all items',
      tags: ['api', 'items', ], // Tags for swagger
      cors: true
    }
  },

  // localhost:8000/item/{id}
  {
    method: 'GET',
    path: '/item/{itemid}',
    handler: handler.get_itemsFilterItemID,
    options: {
      //auth: auth.item_guest,
      description: 'Get item by id',
      notes: 'Returns item filtered by id',
      tags: ['api', 'items', ], // Tags for swagger
      validate: validate.get_item,
      cors: true
    }
  },

  // localhost:8000/item
  {
    method: 'POST',
    path: '/item',
    handler: handler.post_item,
    options: {
      //auth: auth.item_admin,
      description: 'Create a item',
      notes: 'Creates item based on item class',
      tags: ['api', 'items', ], // Tags for swagger
      validate: validate.post_item,
      cors: true
    }
  },

  // localhost:8000/item
  {
    method: 'DELETE',
    path: '/item/{itemid}',
    handler: handler.del_item,
    options: {
      //auth: auth.item_admin,
      description: 'Deletes a item by id',
      notes: 'Deletes a item by id',
      tags: ['api', 'items', ], // Tags for swagger
      validate: validate.del_item,
      cors: true
    }
  },

  //########## Item Instance Properties #############
  // localhost:8000/item/{itemid}/properties
  {
    method: 'GET',
    path: '/item/{itemid}/properties',
    handler: handler.get_itemProperties,
    options: {
      //auth: auth.item_guest,
      description: 'Get all properties for a items',
      notes: 'Returns all properties for a items',
      tags: ['api', 'itemProperties', ], // Tags for swagger
      validate: validate.get_itemProperties
    }
  },

  // localhost:8000/item/{itemid}/property/{propertyid}
  {
    method: 'GET',
    path: '/item/{itemid}/property/{propertyid}',
    handler: handler.get_itemPropertyFilterPropertyID,
    options: {
      //auth: auth.item_guest,
      description: 'Get a specific property for a item',
      notes: 'Returns a specific property for a item',
      tags: ['api', 'itemProperties', ], // Tags for swagger
      validate: validate.get_itemPropertyFilterPropertyID,
      cors: true
    }
  },

  // localhost:8000/item/{itemid}/property
  {
    method: 'POST',
    path: '/item/{itemid}/property',
    handler: handler.post_itemProperty,
    options: {
      //auth: auth.item_admin,
      description: 'Update a property for a specific item',
      notes: 'Update item based on item class',
      tags: ['api', 'itemProperties', ], // Tags for swagger
      validate: validate.post_itemProperty,
      cors: true
    }
  },

  // localhost:8000/item/{itemid}/property
  {
    method: 'PUT',
    path: '/item/{itemid}/property',
    handler: handler.put_itemProperty,
    options: {
      //auth: auth.item_admin,
      description: 'Update a property for a specific item',
      notes: 'Update item based on item class',
      tags: ['api', 'itemProperties', ], // Tags for swagger
      validate: validate.put_itemProperty,
      cors: true
    }
  },

  //########## Item Instance StateModel #############
  // localhost:8000/item/{itemid}/statemodel
  {
    method: 'GET',
    path: '/item/{itemid}/statemodels',
    handler: handler.get_itemStateModel,
    options: {
      //auth: auth.item_guest,
      description: 'Get all statemodel for a items',
      notes: 'Returns all statemodel for a items',
      tags: ['api', 'itemStatemodel'], // Tags for swagger
      validate: validate.get_itemStateModels,
      cors: true
    }
  },

  // localhost:8000/item/item/{itemid}/statemodel/{statemodelid}
  {
    method: 'GET',
    path: '/item/{itemid}/statemodel/{statemodelid}',
    handler: handler.get_itemStateModelFilterStateModelID,
    options: {
      //auth: auth.item_guest,
      description: 'Get a specific statemodelid for a item',
      notes: 'Returns a specific statemodelid for a item',
      tags: ['api', 'itemStatemodel'], // Tags for swagger
      validate: validate.get_itemStateModelFilterStateModelID,
      cors: true
    }
  },

  // localhost:8000/item/{itemid}/property
  {
    method: 'POST',
    path: '/item/{itemid}/statemodel',
    handler: handler.post_itemStateModel,
    options: {
      //auth: auth.item_admin,
      description: 'Create a statemodel for a specific item',
      notes: 'Create a statemodel for a specific item',
      tags: ['api', 'itemStatemodel', ], // Tags for swagger
      validate: validate.post_itemStateModel,
      cors: true
    }
  },

  // localhost:8000/item/{itemid}/statemodel
  {
    method: 'PUT',
    path: '/item/{itemid}/statemodel',
    handler: handler.put_itemStateModel,
    options: {
      //auth: auth.item_admin,
      description: 'Update a statemodel for a specific item',
      notes: 'Update statemodel based on item class',
      tags: ['api', 'itemStatemodel'], // Tags for swagger
      validate: validate.put_itemStateModel,
      cors: true
    }
  },
  ]
