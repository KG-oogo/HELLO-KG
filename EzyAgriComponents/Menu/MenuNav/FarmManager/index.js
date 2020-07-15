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

import { Icon } from "react-native-elements";

import { Title, TouchableRipple } from "react-native-paper";

import TopMenu from "../../../TopMenu/topMenu";
import { connect } from "react-redux";

import { dicArrayConv } from "../../../Redux/dataConvertor";
import _ from "lodash";
import styles from "../../../styles";
import { FlatGrid } from "react-native-super-grid";

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

function FarmManager(props) {
  const [farmManagerItems, setFarmManagerItems] = useState(
    dicArrayConv(props.farmManagerItems)
  );
  //const farmManagerItems = dicArrayConv(props.farmManagerItems);
  useEffect(() => {
    //console.log(props);
  });

  //console.log(props.items2);

  return (
    <View style={styles.container}>
      <TopMenu />

      <View style={stylesLocal.view}>
        <FlatGrid
          itemDimension={130}
          items={farmManagerItems}
          style={stylesLocal.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <TouchableRipple
              onPress={() => {
                //console.log(props.navigation);
                props.navigation.navigate(item.redirect);
              }}
            >
              <View key={item.key} style={stylesLocal.items}>
                <Text style={{ color: "#556B2F" }}>{item.name}</Text>
                <Icon size={80} name={item.icon} color="#556B2F" />
              </View>
            </TouchableRipple>
          )}
        />
      </View>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    marginTop: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "89%",
  },
  items: {
    padding: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    farmManagerItems: state.addUpdateReducer.farmManagerItems,
  };
};

export default connect(mapStateToProps)(FarmManager);
