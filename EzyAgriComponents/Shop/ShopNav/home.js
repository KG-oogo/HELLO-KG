import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TouchableRipple,
  Searchbar,
} from "react-native-paper";

import { connect } from "react-redux";
import { mdiCart } from "@mdi/js";
import { dicArrayConv } from "../../Redux/dataConvertor";
import { addUpdateDataTransaction } from "../../Redux/types";

import TopMenu from "../../TopMenu/topMenu";

import styles from "../../styles";

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
  /*  action("ADD_UPDATE_MENU_ITEMS", {
    10: {
      key: 10,
      name: "Input Shop",
      icon: "shopping-cart",
    },
  }); */
  //console.log("after");
};

function ShopHome(props) {
  const [products, setProducts] = useState(dicArrayConv(props.products));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };

  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.view}>
        <Searchbar
          placeholder="Search"
          onChangeText={(e) => setSearchQuery(e)}
          value={searchQuery}
        />
        {products.length === 0 ? (
          <Text>You have no products on the market</Text>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={products}
            renderItem={({ item }) => (
              <Card style={stylesLocal.items} elevation={10}>
                <Card.Content>
                  <Title>{item.products.name}</Title>
                  <Paragraph>{item.products.description}</Paragraph>
                </Card.Content>
                {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                <Card.Cover source={{ uri: item.products.picture }} />

                <Card.Actions style={{ justifyContent: "space-between" }}>
                  <Button
                    icon="check"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  >
                    Order
                  </Button>
                  <Button
                    icon="star"
                    mode="contained"
                    onPress={() => console.log("Pressed")}
                  ></Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}
      </View>
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
    height: "100%",
  },
  items: {
    //margin: "5%",
    //width: "45%",
    //justifyContent: "center",
    //alignItems: "center",
  },
  card: {
    //paddingVertical: "15%",
  },
  searchbar: {
    //justifyContent: "center",
    //alignItems: "center",
    //flexDirection: "row",
    //flexWrap: "wrap",
  },
});

const mapStateToProps = (state) => ({
  products: state.addUpdateReducer.products,
});

export default connect(mapStateToProps)(ShopHome);
