import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { TabView, SceneMap, renderScene } from "react-native-tab-view";
import { TabBar } from "react-native-tab-view";

import MapKG from "./PrepNav/farmPrep";
import SoilTesting from "./PrepNav/soilTesting";
import CropPlanning from "./PrepNav/cropPlanning";

import { Button } from "react-native-paper";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";

import TopMenu from "../../../TopMenu/topMenu";
import styles from "../../../styles";

const initialLayout = { width: Dimensions.get("window").width };

export default function farmPrep() {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "FieldSelection", title: "Field Selection" },
    { key: "SoilTesting", title: "Soil Testing" },
    { key: "CropPlanning", title: "Crop Planning" },
  ]);

  /* const renderScene = SceneMap({
    FieldSelection:  MapKG,
    SoilTesting: SoilTesting,
    CropPlanning: CropPlanning,
  });
  */

  const renderScene = SceneMap({
    FieldSelection: () => <MapKG />,
    SoilTesting: () => <SoilTesting />,
    CropPlanning: () => <CropPlanning />,
  });

  /* const renderScene = ({ route }) => {
    switch (route.key) {
      case "FieldSelection":
        return <MapKG />;
      case "SoilTesting":
        return <SoilTesting />;
      case "CropPlanning":
        return <CropPlanning />;
      default:
        return null;
    }
  };
*/

  //const renderScene = [MapKG(), SoilTesting(), CropPlanning()];

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
          //renderScene={renderScene}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
          useEffect={useEffect}
        />
      </View>
    </View>
  );
}

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
