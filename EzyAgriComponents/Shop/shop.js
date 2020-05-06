import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";
import TopMenu from "../TopMenu/topMenu";

function AgriShopButton() {
  return <Button>Press me</Button>;
}

/*
icon={({ size, color }) => (
          <Image
            source={require('../assets/chameleon.jpg')}
            style={{ width: size, height: size, tintColor: color }}
          />
        )}
*/

const items = [
  {
    name: "Agri Shop",
    icon: <AgriShopButton />,
  },
  {
    name: "EZY Credit",
    icon: "",
  },
  {
    name: "Garden Mapping",
    icon: "",
  },
  {
    name: "Farm Manager",
    icon: "",
  },
  {
    name: "Better Extension",
    icon: "",
  },
  {
    name: "Produce Market",
    icon: "",
  },
];

export default function ShopSecondTab() {
  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={styles.view}>
        <Text>Shop</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 10,
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
});
