import React, { useState } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { Button, Title, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../Redux/dataConvertor";
import { Icon } from "react-native-elements";

import { mdiCart } from "@mdi/js";

import TopMenu from "../TopMenu/topMenu";
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

const contactMethods = [
  {
    name: "Call",
    method: "012345678",
    icon: "monetization",
  },
  {
    name: "Mail",
    method: "somebody@gmail.com",
    icon: "monetization-on",
  },
  {
    name: "WhatsApp",
    method: "012345678",
    icon: "monetization-on",
  },
  {
    name: "SMS",
    method: "012345678",
    icon: "monetization-on",
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

function SupportFouthTab(props) {
  const [contactMethods, setcontactMethods] = useState(
    dicArrayConv(props.contactMethods)
  );
  //console.log(dicArrayConv(props.contactMethods)[0].redirect);
  return (
    <View style={styles.container}>
      <TopMenu />
      <View style={styles.view}>
        <FlatList
          keyExtractor={(items) => items.name}
          data={contactMethods}
          renderItem={({ item }) => (
            <TouchableRipple
              onPress={() => {
                //console.log(item);
                finger(props.action);
                props.navigation.navigate(item.redirect);
                setcontactMethods(dicArrayConv(props.contactMethods));
              }}
            >
              <View key={item.key} style={styles.items}>
                <Icon size={60} name={item.icon} color="green" />
                <Text style={{ color: "#556B2F", fontSize: 30 }}>
                  {item.name}
                </Text>
                <Text style={{ color: "#556B2F", fontSize: 20 }}>
                  {item.method}
                </Text>
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
    height: "90%",
  },
  items: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  contactMethods: state.addUpdateReducer.contactMethods,
});

export default connect(mapStateToProps)(SupportFouthTab);
