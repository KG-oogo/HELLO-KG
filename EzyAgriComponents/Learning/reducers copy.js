// Login
import {
  LOG_IN_SENT,
  LOG_IN_SUCCESS,
  LOG_IN_REJECTED,

  // Shop
  GET_MENU_ITEMS,
  ADD_UPDATE_MENU_ITEMS,
  DELETE_MENU_ITEMS,
  GET_PRODUCTS,
  ADD_UPDATE_PRODUCTS,
  DELETE_PRODUCTS,
  GET_CATEGORIES,
  ADD_UPDATE_CATEGORIES,
  DELETE_CATEGORIES,
  GET_TRENDING,
  ADD_UPDATE_TRENDING,
  DELETE_TRENDING,
  GET_ORDERS,
  ADD_UPDATE_ORDERS,
  DELETE_ORDERS,
  GET_FAVOURITES,
  ADD_UPDATE_FAVOURITES,
  DELETE_FAVOURITES,
  GET_SERVICES,
  ADD_UPDATE_SERVICES,
  DELETE_SERVICES,

  // Service
  GET_SPRAYING_REQUEST,
  ADD_UPDATE_SPRAYING_REQUEST,
  DELETE_SPRAYING_REQUEST,
  GET_SOIL_TESTING,
  ADD_UPDATE_SOIL_TESTING,
  DELETE_SOIL_TESTING,
  GET_TRACTORS,
  ADD_UPDATE_TRACTORS,
  DELETE_TRACTORS,

  // Support
  GET_CONTACT_METHODS,
  ADD_UPDATE_CONTACT_METHODS,
  DELETE_CONTACT_METHODS,
} from "../types";

import { menuItems } from "../Defaults/menuItems";

import { combineReducers } from "redux";

const s = { menuItems: { x1: 1, x2: 2 }, products: { x3: 3 } };

const test = () => {};
//
// state = [[{},{}],[{},{}]]
// state = [{},{},{},{}]
// state = [{menuItems:[]},{products:[]},{categories:[]},{trending:[]}]
// state = {menuItems:[], products:[], categories:[], trending:[]}
// state = {menuItems:{}, products:{}, categories:{}, trending:{}}
const getReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MENU_ITEMS:
      return state.menuItems;

    case GET_PRODUCTS:
      return state.products;

    case GET_CATEGORIES:
      return state.categories;

    case GET_TRENDING:
      return state.trending;

    case GET_ORDERS:
      return state.orders;

    case GET_FAVOURITES:
      return state.favourites;

    case GET_SERVICES:
      return state.services;

    case GET_SPRAYING_REQUEST:
      return state.sprayingRequest;

    case GET_SOIL_TESTING:
      return state.soilTesting;

    case GET_TRACTORS:
      return state.tractors;

    case GET_CONTACT_METHODS:
      return state.methods;

    default:
      return state;
  }
};

/*
//for the front end
// state = [{},{},{},{}]
//
// state = [[{},{}],[{},{}]]
// state = {menuItems:{
                "input shop":{
                    "key":0,
                    "name":"input shop",
                    "icon":"Shopping"
                },
                "business records":{
                    "key":1,
                    "name": "business records",
                    "icon": "credit card"
                }

                }, 
            products:{
               "peach": {
                    
                    "grade": "A"
                },
                "apple": {
                    
                    "grade":"B"
                }
            
            }, 
            categories:{}, 
            trending:{}}


nav to apple
state.products
*/
/*
=========== Remove duplicates=================
const names = ['John', 'Paul', 'George', 'Ringo', 'John'];

let x = (names) => names.filter((v,i) => names.indexOf(v) === i)
x(names); // 'John', 'Paul', 'George', 'Ringo'
========== Flatlist with object of objects ===================================

<FlatList
          data={Object.keys(obj)}
          renderItem={({ item }) => <Text>{obj[item].name}</Text>}
        />
*/

/* const items = {
  1: {
    key: 1,
    name: "Input Shop",
    icon: "shopping-cart",
  },
  2: {
    key: 2,
    name: "Business Records",
    icon: "credit-card",
  },

  3: {
    key: 3,
    name: "Farm Prep",
    icon: "place",
  },
  4: {
    key: 4,
    name: "Farm Manager",
    icon: "person",
  },
  5: {
    key: 5,
    name: "Information",
    icon: "info",
  },
  6: {
    key: 6,
    name: "Produce Market",
    icon: "monetization-on",
  },
}; */

//state = state.key == {a:{},b:{}}
//payload:{key:"", val:""}
export const addUpdateReducer = (state = { menuItems: menuItems }, action) => {
  //console.log(Object.keys(state));
  //console.log(ADD_UPDATE_MENU_ITEMS);
  //console.log(typeof ADD_UPDATE_MENU_ITEMS);
  //console.log(typeof "ADD_UPDATE_MENU_ITEMS");
  switch (action.type) {
    case ADD_UPDATE_MENU_ITEMS:
      //const keys = Object.keys(state.menuItems)
      //console.log(action.type);
      //state = state + 2;
      //state[action.payload.key] = action.payload.val;
      /*
     7: {
      key: 7,
      name: "Input Shop",
      icon: "shopping-cart",
    }

      */
      state.menuItems[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];

      console.log(state);
      return state;

    default:
      //console.log(action.type);
      return state;
  }
};

const reducer = combineReducers({
  addUpdateReducer,
});

export default reducer;
