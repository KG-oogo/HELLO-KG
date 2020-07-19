import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import {
  Button,
  TouchableRipple,
  Card,
  Title,
  Paragraph,
  Dialog,
} from "react-native-paper";
import { connect } from "react-redux";

import { dicArrayConv } from "../../Redux/dataConvertor";
import { deleteDataTransaction, DELETE_ORDERS } from "../../Redux/types";
import { mdiCart } from "@mdi/js";

import TopMenu from "../../TopMenu/topMenu";
import { withNavigation, StackRouter } from "react-navigation";

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

function ShopMyOrders(props) {
  const [orders, setOrders] = useState(dicArrayConv(props.orders));
  const deleteProduct = (key) => {
    const payload = key;
    //console.log(payload);

    props.deleteDataTransaction(DELETE_ORDERS, payload);
    /**/
  };

  // Total
  const [total, setTotal] = useState(0);
  const totalCalc = () => {
    let t = 0;
    orders.forEach((value) => {
      console.log(value.products);
      t = t + parseFloat(value.products.products.amount);
    });
    setTotal(t);
  };
  /* useEffect(
    () =>
      setInterval(() => {
        totalCalc();
      }, 1000),
    [orders]
  ); */

  useEffect(() => totalCalc(), [orders]);

  /*
setInterval(() => {
      setBadgeCount(dicArrayConv(props.orders).length);
    }, 1000);
  */

  //console.log(total());
  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.view}>
        {orders.length === 0 ? (
          <Text>You have no products selected</Text>
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", padding: "5%" }}
            // numColumns={2}
            data={orders}
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
                      setOrders(dicArrayConv(props.orders));
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
      <View style={stylesLocal.total}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Total:R{total}</Text>
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate("Buy", { total: total })}
        >
          Buy
        </Button>
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
    height: "90%",
    margin: "1%",
  },
  items: {
    ///justifyContent: "center",
    //alignItems: "center",
  },
  card: { paddingVertical: "15%" },
  total: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: "1%",
  },
});

const mapStateToProps = (state) => ({
  orders: state.addUpdateReducer.orders,
});

export default connect(mapStateToProps, { deleteDataTransaction })(
  withNavigation(ShopMyOrders)
);
