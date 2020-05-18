import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
//import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import Login from "./Login/login";
import MenuFirstTab from "./Menu/menu";
import ShopSecondTab from "./Shop/shop";
//import ShopTopNavigator from "./Shop/shop";
import TopMenu from "./TopMenu/topMenu";
//import ShopHome from "./Shop/ShopNav/home";
//import ShopMyOrders from "./Shop/ShopNav/myOrders";
//import ShopMyFavourites from "./Shop/ShopNav/myFavourites";

import ServiceThirdTab from "./Service/service";
import SupportFouthTab from "./Support/support";
import RegisterFarmerSupport from "../SharedComponents/register";

const MenuIcon = (props) => (
  <Ionicons
    name={"md-home"}
    size={30}
    color={props.focused ? "white" : "darkgrey"}
  />
);

const ShopIcon = (props) => (
  <Ionicons
    name={"ios-basket"}
    size={30}
    color={props.focused ? "white" : "darkgrey"}
  />
);

const ServiceIcon = (props) => (
  <Ionicons
    name={"ios-briefcase"}
    size={30}
    color={props.focused ? "white" : "darkgrey"}
  />
);

const SupportIcon = (props) => (
  <Ionicons
    name={"ios-people"}
    size={30}
    color={props.focused ? "white" : "darkgrey"}
  />
);

//shop
/* const ShopTopNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: ShopHome,
    navigationOptions: {
      tabBarIcon: MenuIcon,
    },
  },
  MyOrders: {
    screen: ShopMyOrders,
    navigationOptions: {
      tabBarIcon: MenuIcon,
    },
  },
  MyFavourites: {
    screen: ShopMyFavourites,
    navigationOptions: {
      tabBarIcon: MenuIcon,
    },
  },
}); */

//Bottom Menu Navigator
const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Menu: {
      screen: MenuFirstTab,
      navigationOptions: {
        tabBarIcon: MenuIcon,
      },
    },
    Shop: {
      screen: ShopSecondTab,
      navigationOptions: {
        tabBarIcon: ShopIcon,
      },
    },

    Service: {
      screen: ServiceThirdTab,
      navigationOptions: {
        tabBarIcon: ServiceIcon,
      },
    },
    Support: {
      screen: SupportFouthTab,
      navigationOptions: {
        tabBarIcon: SupportIcon,
      },
    },
  },
  {
    initialRouteName: "Menu",
    shifting: false,
  }
);

const SwitchNivigator = createSwitchNavigator(
  {
    Login: Login,
    Application: BottomTabNavigator,
  },
  {
    initialRouteName: "Login",
  }
);

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    flexWrap: "wrap",
    height: "80%",
  },
});

export default createAppContainer(SwitchNivigator);
