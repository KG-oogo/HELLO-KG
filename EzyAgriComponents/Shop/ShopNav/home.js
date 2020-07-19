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

import { dicArrayConv } from "../../Redux/dataConvertor";
import { addUpdateDataTransaction } from "../../Redux/types";
import { ADD_UPDATE_ORDERS, ADD_UPDATE_FAVOURITES } from "../../Redux/types";

import TopMenu from "../../TopMenu/topMenu";

import styles from "../../styles";

function ShopHome(props) {
  const [products, setProducts] = useState(dicArrayConv(props.products));
  const [orders, setOrders] = useState(dicArrayConv(props.orders));
  const [favourites, setfavourites] = useState(dicArrayConv(props.favourites));
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = () => {
    console.log("");
  };

  const addProduct = (products, key, type) => {
    // get product
    const product = products.filter((value, k, arr) => {
      return value.key === key;
    });

    //get next index
    let nextIndex = "";
    let exists = 0;
    // If variable nextIndex is empty
    // If key doesnt exist
    if (exists === 0) {
      if (type === ADD_UPDATE_ORDERS) {
        nextIndex = (orders.length + 1).toString();
      }
      if (type === ADD_UPDATE_FAVOURITES) {
        nextIndex = (favourites.length + 1).toString();
      }
    }

    // create payload

    const payload = {
      [nextIndex]: {
        key: nextIndex,
        products: product[0],
      },
    };

    //dispatch payload
    props.addUpdateDataTransaction(nextIndex, type, payload);
    /*   */
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
                  <Text>Name:</Text>
                  <Title>{item.products.name}</Title>
                  <Paragraph>{item.products.description}</Paragraph>
                  <Text>R:{item.products.amount}</Text>
                </Card.Content>
                {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                <Card.Cover source={{ uri: item.products.picture }} />

                <Card.Actions style={{ justifyContent: "space-between" }}>
                  <Button
                    icon="check"
                    mode="contained"
                    onPress={() => {
                      addProduct(products, item.key, ADD_UPDATE_ORDERS);
                      setOrders(dicArrayConv(props.orders));
                    }}
                  >
                    Order
                  </Button>
                  <Button
                    icon="star"
                    mode="contained"
                    onPress={() => {
                      addProduct(products, item.key, ADD_UPDATE_FAVOURITES);
                      setfavourites(dicArrayConv(props.favourites));
                    }}
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
  orders: state.addUpdateReducer.orders,
  favourites: state.addUpdateReducer.favourites,
});

export default connect(mapStateToProps, { addUpdateDataTransaction })(ShopHome);
