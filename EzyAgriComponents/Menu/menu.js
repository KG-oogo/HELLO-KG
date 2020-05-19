import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";

import { action } from "../Redux/types";

import { dicArrayConv } from "../Redux/dataConvertor";
import _ from "lodash";
import styles from "../styles";

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

/*
{
    key: 2,
    name: "EZY Credit",
    icon: "credit-card",
  },
*/

const items = [
  {
    key: 1,
    name: "Input Shop",
    icon: "shopping-cart",
  },
  {
    key: 2,
    name: "Business Records",
    icon: "credit-card",
  },

  {
    key: 3,
    name: "Farm Prep",
    icon: "place",
  },
  {
    key: 4,
    name: "Farm Manager",
    icon: "person",
  },
  {
    key: 5,
    name: "Information",
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

const finger = (action) => {
  //console.log(action);
  /* action("ADD_UPDATE_MENU_ITEMS", {
    10: {
      key: 10,
      name: "Input Shop",
      icon: "shopping-cart",
    },
  }); */
  //console.log("after");
};

/* const dicArrayConv = (dic) => {
  return _.values(dic);
}; */

function MenuFirstTab(props) {
  const [menuItems, setMenuItems] = useState(dicArrayConv(props.menuItems));
  //const menuItems = dicArrayConv(props.menuItems);
  useEffect(() => {
    //console.log(props);
  });

  //console.log(props.items2);

  return (
    <View style={styles.container}>
      <TopMenu />

      <View style={styles.view}>
        {/* <FlatList
          style={{ width: "50%" }}
          numColumns={2}
          keyExtractor={() => menuKeys(Object.keys(props.menuItems))}
          data={menuItems}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => finger(props.action)}>
              <View style={styles.items}>
                <Text style={{ color: "green" }}>
                  {props.menuItems[item].name}
                </Text>
                <Icon
                  size={80}
                  name={props.menuItems[item].icon}
                  color="green"
                />
              </View>
            </TouchableRipple>
          )}
        /> */}

        <FlatList
          style={{ width: "50%" }}
          numColumns={2}
          data={menuItems}
          renderItem={({ item }) => (
            <TouchableRipple
              onPress={() => {
                finger(props.action);
                setMenuItems(dicArrayConv(props.menuItems));
              }}
            >
              <View key={item.key} style={styles.items}>
                <Text style={{ color: "#556B2F" }}>{item.name}</Text>
                <Icon size={80} name={item.icon} color="#556B2F" />
              </View>
            </TouchableRipple>
          )}
        />

        {/* {items.map((item) => (
          <TouchableRipple onPress={() => finger(item.name)}>
            <View key={item.key} style={styles.items}>
              <Text style={{ color: "green" }}>{item.name}</Text>
              <Icon size={80} name={item.icon} color="green" />
            </View>
          </TouchableRipple>
        ))} */}
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

const stylesLocal = StyleSheet.create({
  container: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  view: {
    //justifyContent: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    flexWrap: "wrap",
    height: "90%",
  },
  items: {
    padding: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    menuItems: state.addUpdateReducer.menuItems,
  };
};

export default connect(mapStateToProps, { action })(MenuFirstTab);
