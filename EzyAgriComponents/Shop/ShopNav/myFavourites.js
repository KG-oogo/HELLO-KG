import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { deleteDataTransaction } from "../../Redux/types";
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

function ShopMyFavourites(props) {
  const [favourites, setfavourites] = useState(dicArrayConv(props.favourites));
  console.log(favourites);
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {favourites.length === 0 ? (
          <Text>You have no favourites</Text>
        ) : (
          <FlatList
            style={{ width: "50%" }}
            numColumns={2}
            data={favourites}
            renderItem={({ item }) => (
              <TouchableRipple
                onPress={() => {
                  finger(props.action);
                  setfavourites(dicArrayConv(props.favourites));
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
  favourites: state.addUpdateReducer.favourites,
});

export default connect(mapStateToProps)(ShopMyFavourites);
