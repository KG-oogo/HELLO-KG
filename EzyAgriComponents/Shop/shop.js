import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { TabBar } from "react-native-tab-view";

import ShopHome from "./ShopNav/home";
import ShopMyOrders from "./ShopNav/myOrders";
import ShopMyFavourites from "./ShopNav/myFavourites";
import { Button } from "react-native-paper";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";

import TopMenu from "../TopMenu/topMenu";
import styles from "../styles";

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function ShopSecondTab() {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "Home", title: "Home" },
    { key: "Orders", title: "MY Order List" },
    { key: "Favourites", title: "Favourites" },
  ]);

  const renderScene = SceneMap({
    Home: ShopHome,
    Orders: ShopMyOrders,
    Favourites: ShopMyFavourites,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "yellow" }}
      style={{ backgroundColor: "#556B2F" }}
    />
  );

  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={styles.view}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

/* export default function ShopSecondTab() {
  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={styles.view}>
        <Text>Shop</Text>
      </View>
    </View>
  );
} */

const stylesLocal = StyleSheet.create({
  container: {
    marginTop: "10%",
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    flexWrap: "wrap",
    height: "90%",
  },
  scene: {
    flex: 1,
  },
});
