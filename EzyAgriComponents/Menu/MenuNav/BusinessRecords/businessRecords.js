import React, { useState } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { Button, Title, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../../Redux/dataConvertor";
import { Icon } from "react-native-elements";

import { mdiCart } from "@mdi/js";

import TopMenu from "../../../TopMenu/topMenu";
import styles from "../../../styles";

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

const menuItems = [
  {
    key: "1",
    name: "Statement of Comprehensive Income",
  },
  {
    key: "2",
    name: "Statement of Financial Position",
  },
  {
    key: "3",
    name: "Statement of Cash Flow",
  },
];

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

function BusinessRecords(props) {
  const [records, setRecords] = useState(menuItems);
  //console.log(dicArrayConv(props.contactMethods)[0].redirect);
  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={stylesLocal.view}>
        <FlatList
          keyExtractor={(items) => items.name}
          data={records}
          contentContainerStyle={stylesLocal.view}
          renderItem={({ item }) => (
            <React.Fragment>
              <Button
                key={item.key}
                mode="contained"
                style={stylesLocal.button}
                onPress={() => console.log("pressed")}
              >
                {item.name}
              </Button>
            </React.Fragment>
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
    //flexDirection: "row",
    //flexWrap: "wrap",
    height: "89%",
    //flex: 1,
  },
  items: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "5%",
  },
});

const mapStateToProps = (state) => ({
  contactMethods: state.addUpdateReducer.contactMethods,
});

export default connect(mapStateToProps)(BusinessRecords);
