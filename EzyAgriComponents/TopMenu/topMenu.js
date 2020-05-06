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

const finger = (name) => {
  console.log(name);
};

export default function TopMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text
          style={{
            color: "green",
            flexGrow: 1,
            paddingRight: "50%",
            paddingLeft: "5%",
          }}
        >
          KG Farmer
        </Text>
        <Icon size={30} name="shopping-cart" color="green" />
        <Icon size={30} name="person" color="green" />
        <Icon size={30} name="menu" color="green" />
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
    flex: 1,
  },
  view: {
    flexDirection: "row",
  },
});
