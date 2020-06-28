import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { TabBar } from "react-native-tab-view";

import MyProduce from "./ProduceNav/myProduce";
import Prices from "./ProduceNav/prices";
import Demand from "./ProduceNav/demand";
import { Button } from "react-native-paper";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";

import TopMenu from "../../../TopMenu/topMenu";
import styles from "../../../styles";

const initialLayout = { width: Dimensions.get("window").width };

export default function ProduceMarket(props) {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "MyProduce", title: "My Produce" },
    { key: "Prices", title: "Prices" },
    { key: "Demand", title: "Demand" },
  ]);

  const renderScene = SceneMap({
    MyProduce: MyProduce,
    Prices: () => <Prices />,
    Demand: () => <Demand />,
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
      <View style={stylesLocal.view}>
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
    height: "89%",
  },
  scene: {
    flex: 1,
  },
});
