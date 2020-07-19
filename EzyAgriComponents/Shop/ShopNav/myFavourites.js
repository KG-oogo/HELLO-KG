import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  Button,
  TouchableRipple,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { connect } from "react-redux";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { deleteDataTransaction, DELETE_FAVOURITES } from "../../Redux/types";
import { mdiCart } from "@mdi/js";

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
  //console.log(favourites);
  const deleteProduct = (key) => {
    const payload = key;
    props.deleteDataTransaction(DELETE_FAVOURITES, payload);
  };

  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.view}>
        {favourites.length === 0 ? (
          <Text>You have no favourites</Text>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={favourites}
            renderItem={({ item }) => (
              <Card style={stylesLocal.items} elevation={10}>
                <Card.Content>
                  <Text>Name:</Text>
                  <Title>{item.products.products.name}</Title>
                  <Paragraph>{item.products.products.description}</Paragraph>
                  <Text>R:{item.products.products.amount}</Text>
                </Card.Content>
                {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                <Card.Cover source={{ uri: item.products.products.picture }} />
                <Card.Actions style={{ justifyContent: "space-between" }}>
                  <Button
                    icon="check"
                    mode="contained"
                    onPress={() => {
                      deleteProduct(item.key);
                      setfavourites(dicArrayConv(props.favourites));
                    }}
                  >
                    Remove
                  </Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}
      </View>
      {/* <View>
        <Text>Total:R10000</Text>
      </View> */}
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignItems: "center",
    //flex: 1,
  },
  view: {
    //justifyContent: "center",
    //alignItems: "center",
    //flexDirection: "row",

    flexWrap: "wrap",
    height: "90%",
  },
  items: {
    //margin: "5%",
    ///justifyContent: "center",
    //alignItems: "center",
  },
  card: { paddingVertical: "15%" },
});

const mapStateToProps = (state) => ({
  favourites: state.addUpdateReducer.favourites,
});

export default connect(mapStateToProps, { deleteDataTransaction })(
  ShopMyFavourites
);
