import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";
import TopMenu from "../../TopMenu/topMenu";
import styles from "../../styles";
import { withNavigation } from "react-navigation";

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

function ServiceSpraying(props) {
  const [spraying, setSpraying] = useState(dicArrayConv(props.spraying));
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {spraying.length === 0 ? (
          <Text>You have not requested any spraying</Text>
        ) : (
          <FlatList
            style={{ width: "50%" }}
            numColumns={2}
            data={spraying}
            renderItem={({ item }) => (
              <TouchableRipple
                onPress={() => {
                  finger(props.action);
                  setSpraying(dicArrayConv(props.spraying));
                }}
              >
                <View key={item.key} style={styles.items}>
                  <Text style={{ color: "green" }}>{item.category}</Text>
                </View>
              </TouchableRipple>
            )}
          />
        )}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate("")}
          style={{ width: "50%", justifyContent: "center" }}
        >
          Request Spraying
        </Button>
      </View>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    marginTop: "20%",
    flex: 1,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    flexWrap: "wrap",
    height: "80%",
  },
  items: {
    padding: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  spraying: state.addUpdateReducer.spraying,
});

export default connect(mapStateToProps)(withNavigation(ServiceSpraying));
