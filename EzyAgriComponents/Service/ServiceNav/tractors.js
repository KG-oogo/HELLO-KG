import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { mdiCart } from "@mdi/js";

import { Title } from "react-native-paper";
import TopMenu from "../../TopMenu/topMenu";

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

function ServiceTractor(props) {
  const [tractors, settractors] = useState(dicArrayConv(props.tractors));
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {tractors.length === 0 ? (
          <Text>There are no tractors to request</Text>
        ) : (
          <FlatList
            style={{ width: "50%" }}
            numColumns={2}
            data={tractors}
            renderItem={({ item }) => (
              <TouchableRipple
                onPress={() => {
                  finger(props.action);
                  settractors(dicArrayConv(props.tractors));
                }}
              >
                <View key={item.key} style={styles.items}>
                  <Text style={{ color: "green" }}>{item.company}</Text>
                </View>
              </TouchableRipple>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  tractors: state.addUpdateReducer.tractors,
});

export default connect(mapStateToProps)(ServiceTractor);
