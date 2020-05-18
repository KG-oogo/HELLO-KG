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

function ServiceSoilTesting(props) {
  const [soilTesting, setsoilTesting] = useState(
    dicArrayConv(props.soilTesting)
  );
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {soilTesting.length === 0 ? (
          <Text>There are no soil sample qoutes</Text>
        ) : (
          <FlatList
            style={{ width: "50%" }}
            numColumns={2}
            data={soilTesting}
            renderItem={({ item }) => (
              <TouchableRipple
                onPress={() => {
                  finger(props.action);
                  setsoilTesting(dicArrayConv(props.soilTesting));
                }}
              >
                <View key={item.key} style={styles.items}>
                  <Text style={{ color: "green" }}>{item.description}</Text>
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
  soilTesting: state.addUpdateReducer.soilTesting,
});

export default connect(mapStateToProps)(ServiceSoilTesting);
