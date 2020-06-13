// Login
export const LOG_IN_SENT = "LOG_IN_SENT";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_REJECTED = "LOG_IN_REJECTED";

// Shop
export const GET_MENU_ITEMS = "GET_MENU_ITEMS";
export const ADD_UPDATE_MENU_ITEMS = "ADD_UPDATE_MENU_ITEMS";
export const DELETE_MENU_ITEMS = "DELETE_MENU_ITEMS";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_UPDATE_PRODUCTS = "ADD_UPDATE_PRODUCTS";
export const DELETE_PRODUCTS = "DELETE_PRODUCTS";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_UPDATE_CATEGORIES = "ADD_UPDATE_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";

export const GET_TRENDING = "GET_TRENDING";
export const ADD_UPDATE_TRENDING = "ADD_UPDATE_TRENDING";
export const DELETE_TRENDING = "DELETE_TRENDING";

export const GET_ORDERS = "GET_ORDERS";
export const ADD_UPDATE_ORDERS = "ADD_UPDATE_ORDERS";
export const DELETE_ORDERS = "DELETE_ORDERS";

export const GET_FAVOURITES = "GET_FAVOURITES";
export const ADD_UPDATE_FAVOURITES = "ADD_UPDATE_FAVOURITES";
export const DELETE_FAVOURITES = "DELETE_FAVOURITES";

export const GET_SERVICES = "GET_SERVICES";
export const ADD_UPDATE_SERVICES = "ADD_UPDATE_SERVICES";
export const DELETE_SERVICES = "DELETE_SERVICES";

// Service
export const GET_SPRAYING_REQUEST = "GET_SPRAYING_REQUEST";
export const ADD_UPDATE_SPRAYING_REQUEST = "ADD_UPDATE_SPRAYING_REQUEST";
export const DELETE_SPRAYING_REQUEST = "DELETE_SPRAYING_REQUEST";

export const GET_SOIL_TESTING = "GET_SOIL_TESTING";
export const ADD_UPDATE_SOIL_TESTING = "ADD_UPDATE_SOIL_TESTING";
export const DELETE_SOIL_TESTING = "DELETE_SOIL_TESTING";

export const GET_TRACTORS = "GET_TRACTOR";
export const ADD_UPDATE_TRACTORS = "ADD_UPDATE_TRACTOR";
export const DELETE_TRACTORS = "DELETE_TRACTOR";

// Support
export const GET_CONTACT_METHODS = "GET_CONTACT_METHOD";
export const ADD_UPDATE_CONTACT_METHODS = "ADD_UPDATE_CONTACT_METHOD";
export const DELETE_CONTACT_METHODS = "DELETE_CONTACT_METHOD";

// Farm Prep
export const ADD_UPDATE_FIELD = "ADD_UPDATE_FIELD";

// Action Creators data = {type:<<>>, payload:<<>>}
// payload:"name"
export const action = (type, payload) => {
  return (dispatch) => {
    dispatch({ type: type, payload: payload });
  };
};

// This compliments Action creator "action"
// It formats the (actionType, payload) to be dispatched
// Parameters:
//      state - array from front end dicArrayConv
//      action - imported action creator "action"
//      actionType - imported action type
//      payload -  the data to be changed
export const addUpdateDataTransaction = (nextIndex, actionType, payload) => {
  //const stateLen = state.length;
  //const nextIndex = stateLen + 1;
  //console.log("addUpdateDataTransaction");
  /* action("ADD_UPDATE_MENU_ITEMS", {
        10: {
          key: 10,
          name: "Input Shop",
          icon: "shopping-cart",
        },
      }); */

  /* const finalObject = {
    [nextIndex]: { actionType: actionType, payload: payload },
  }; */
  //console.log(finalObject);
  //action(actionType, finalObject);

  return (dispatch, ownProps) => {
    dispatch({ type: actionType, payload: payload });
  };
};

// This compliments Action creator "action"
// It formats the (actionType, payload) to be dispatched
// This is still work in progress
// Parameters:
//      state - array from front end dicArrayConv
//      action - imported action creator "action"
//      actionType - imported action type
//      payload -  the data to be changed
export const deleteDataTransaction = (action, actionType, payload) => {
  action(actionType, payload);
};
