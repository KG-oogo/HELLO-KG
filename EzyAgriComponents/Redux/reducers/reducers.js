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

import { menuItems } from "../Defaults/menu/menuItems";
import { products } from "../Defaults/shop/products";
import { soilTesting } from "../Defaults/service/soilSamples";
import { tractors } from "../Defaults/service/tractors";
import { contactMethods } from "../Defaults/support/contactMethods";
import { weather } from "../Defaults/information/weather";
import { crop } from "../Defaults/information/crop";
import { disease, pest } from "../Defaults/information/diagnosis";
import { cowManagement, cowDiagnosis } from "../Defaults/information/dairy";
import { news } from "../Defaults/information/news";
import { videos } from "../Defaults/information/video";
import { prices } from "../Defaults/produceMarket/prices";
import { demand } from "../Defaults/produceMarket/demand";
import { infoMenu } from "../Defaults/information/inforMenu";

import { combineReducers } from "redux";

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

//state = state.key == {a:{},b:{}}
//payload:{key:"", val:""}
//11 cases
export const addUpdateReducer = (
  state = {
    menuItems: menuItems,
    //Shop
    products: products,
    orders: {},
    favourites: {},
    //Service
    spraying: {},
    soilTesting: soilTesting,
    tractors: tractors,
    //Support
    contactMethods: contactMethods,
    //not fully implemented
    //Information
    weather: weather,
    crop: crop,
    disease: disease,
    pest: pest,
    cowManagement: cowManagement,
    cowDiagnosis: cowDiagnosis,
    news: news,
    videos: videos,
    //Produce Market
    myProduce: {},
    prices: prices,
    demand: demand,
    infoMenu: infoMenu,
  },
  action
) => {
  switch (action.type) {
    case ADD_UPDATE_MENU_ITEMS:
      /*
     7: {
      key: 7,
      name: "Input Shop",
      icon: "shopping-cart", 
    }

      */

      state.menuItems[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];

    case ADD_UPDATE_PRODUCTS:
      state.products[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];
      return state;
    case ADD_UPDATE_ORDERS:
      state.orders[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];
      return state;
    case ADD_UPDATE_FAVOURITES:
      state.favourites[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];
      return state;
    case ADD_UPDATE_SPRAYING_REQUEST:
      state.spraying[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];
      return state;

    case ADD_UPDATE_SOIL_TESTING:
      state.soilTesting[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];
      return state;

    case ADD_UPDATE_TRACTORS:
      state.tractor[Object.keys(action.payload)[0]] =
        action.payload[Object.keys(action.payload)[0]];
      return state;
    default:
      return state;
  }
};

//11 cases
export const deleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MENU_ITEMS:
      /*
       7: {
        key: 7,
        name: "Input Shop",
        icon: "shopping-cart", 
      }  
  
        */
      delete state.menuItems[Object.keys(action.payload)[0]];

      return state;

    case DELETE_PRODUCTS:
      delete state.products[Object.keys(action.payload)[0]];
      return state;

    case DELETE_ORDERS:
      delete state.orders[Object.keys(action.payload)[0]];

      return state;

    case DELETE_FAVOURITES:
      delete state.favourites[Object.keys(action.payload)[0]];

      return state;
    case DELETE_SPRAYING_REQUEST:
      delete state.spraying[Object.keys(action.payload)[0]];

      return state;
    case DELETE_SOIL_TESTING:
      delete state.soilTesting[Object.keys(action.payload)[0]];

      return state;

    case DELETE_TRACTORS:
      delete state.tractor[Object.keys(action.payload)[0]];

      return state;

    default:
      return state;
  }
};

const reducer = combineReducers({
  addUpdateReducer,
  deleteReducer,
});

export default reducer;
