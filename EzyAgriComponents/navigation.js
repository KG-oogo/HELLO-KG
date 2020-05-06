import React from "react";
import { Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Login from "./Login/login";
import MenuFirstTab from "./Menu/menu";
import ShopSecondTab from "./Shop/shop";
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

const TabNavigator = createMaterialBottomTabNavigator(
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
    Application: TabNavigator,
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(SwitchNivigator);
