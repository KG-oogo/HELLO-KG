import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";
import TopMenu from "../TopMenu/topMenu";

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import ShopHome from "./ShopNav/home";
import ShopMyOrders from "./ShopNav/myOrders";
import ShopMyFavourites from "./ShopNav/myFavourites";

import { Ionicons } from "@expo/vector-icons";

function AgriShopButton() {
  return <Button>Press me</Button>;
}

const MenuIcon = (props) => (
  <Ionicons
    name={"md-home"}
    size={30}
    color={props.focused ? "white" : "darkgrey"}
  />
);
/*
icon={({ size, color }) => (
          <Image
            source={require('../assets/chameleon.jpg')}
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
*/

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
const ShopTopNavigator = createMaterialTopTabNavigator(
  {
    HomeScreen: {
      screen: ShopHome,
      navigationOptions: { title: "Home", tabBarIcon: MenuIcon },
    },
    MyOrders: {
      screen: ShopMyOrders,
      navigationOptions: {
        title: "My Orders",
        tabBarIcon: MenuIcon,
      },
    },
    MyFavourites: {
      screen: ShopMyFavourites,
      navigationOptions: {
        title: "My Favourite",
      },
    },
  },
  {
    initialRouteName: "HomeScreen",
    tabBarOptions: {
      tabStyle: { justifyContent: "center", alignItems: "center" },

      style: {
        backgroundColor: "green",
        height: "20%",
        marginTop: "20%",
      },
    },
    shifting: false,
  }
);

export function ShopSecondTab() {
  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={styles.view}>
        <ShopTopNavigator />
      </View>
    </View>
  );
}

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

export default createAppContainer(ShopTopNavigator);
