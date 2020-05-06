import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { mdiCart, mdiFingerprint } from "@mdi/js";
import { Icon } from "react-native-elements";

import { Title, TouchableRipple } from "react-native-paper";

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
    key: 1,
    name: "Agri Shop",
    icon: "shopping-cart",
  },
  {
    key: 2,
    name: "EZY Credit",
    icon: "credit-card",
  },
  {
    key: 3,
    name: "Garden Mapping",
    icon: "place",
  },
  {
    key: 4,
    name: "Farm Manager",
    icon: "person",
  },
  {
    key: 5,
    name: "Better Extension",
    icon: "info",
  },
  {
    key: 6,
    name: "Produce Market",
    icon: "monetization-on",
  },
];

const TabIcon = (props) => (
  <Ionicons
    name={"md-home"}
    size={35}
    color={props.focused ? "grey" : "darkgrey"}
  />
);

const finger = (name) => {
  console.log(name);
};

export default function MenuFirstTab() {
  return (
    <View style={styles.container}>
      <TopMenu />

      <View style={styles.view}>
        {/* <FlatList
          numColumns={2}
          data={items}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => finger(item.name)}>
              <View key={item.key} style={styles.items}>
                <Text style={{ color: "green" }}>{item.name}</Text>
                <Icon size={70} name={item.icon} color="green" />
              </View>
            </TouchableRipple>
          )}
        /> */}

        {items.map((item) => (
          <TouchableRipple onPress={() => finger(item.name)}>
            <View key={item.key} style={styles.items}>
              <Text style={{ color: "green" }}>{item.name}</Text>
              <Icon size={80} name={item.icon} color="green" />
            </View>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
}

/*
{items.map((item) => (
        <Button
          icon="info"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.items}
        >
          {item.name}
        </Button>
      ))}
//////////////////////////////

<View key={item.key} style={styles.items}>
          <Text>{item.name}</Text>
          <Icon name={item.icon} />
        </View>
*/

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 10,
    flex: 1,
  },
  view: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",

    flexWrap: "wrap",
  },
  items: {
    padding: 30,
  },
});
