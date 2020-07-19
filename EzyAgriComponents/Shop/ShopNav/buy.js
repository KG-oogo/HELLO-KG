import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  Button,
  TouchableRipple,
  Card,
  Title,
  Paragraph,
  Dialog,
} from "react-native-paper";
import styles from "../../styles";
import TopMenu from "../../TopMenu/topMenu";
import { withNavigation, StackRouter } from "react-navigation";

const Buy = (props) => {
  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={{ margin: "6%", flex: 1 }}>
        <Button
          onPress={() => {
            props.navigation.navigate("Shop");
          }}
          mode={"contained"}
        >
          Back to Shop
        </Button>
      </View>
      <View style={stylesLocal.view}>
        <Text style={{ fontSize: 20, fontWeight: "bold", margin: "5%" }}>
          {" "}
          Buying for: R{props.navigation.getParam("total")}
        </Text>
        <Button
          onPress={() => {
            props.navigation.navigate("");
          }}
          mode={"contained"}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignItems: "center",
  },
  view: {
    //justifyContent: "center",
    //alignItems: "center",
    //flexDirection: "row",

    flexWrap: "wrap",
    height: "70%",
    padding: "15%",
    //flex: 1,
  },
  items: {
    ///justifyContent: "center",
    //alignItems: "center",
  },
  card: { paddingVertical: "15%" },
  total: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: "1%",
  },
});

export default withNavigation(Buy);
