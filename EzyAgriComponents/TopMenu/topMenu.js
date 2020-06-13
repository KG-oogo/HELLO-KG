import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { Card, Button, Badge } from "react-native-paper";
import { mdiCart, mdiFingerprint } from "@mdi/js";
import { Icon } from "react-native-elements";

import { Title, TouchableRipple } from "react-native-paper";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { dicArrayConv } from "../Redux/dataConvertor";

import { useSpring, animated } from "react-spring";

const initialLayout = { width: Dimensions.get("window").width };
console.log(typeof initialLayout);

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

const finger = (name) => {
  console.log(name);
};

const MyComponent = () => <Badge>{3}</Badge>;

function TopMenu(props) {
  const move = useSpring({
    rotate: 45,
  });
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {props.main === "yes" ? (
          <TouchableRipple onPress={() => props.navigation.goBack()}>
            <Text
              style={{
                color: "#556B2F",
                flexGrow: 1,
                paddingRight: "40%",
                paddingLeft: "5%",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Agri-webSA
            </Text>
          </TouchableRipple>
        ) : (
          <TouchableRipple
            onPress={() => props.navigation.navigate("Application")}
          >
            <Text
              style={{
                color: "#556B2F",
                flexGrow: 1,
                paddingRight: "40%",
                paddingLeft: "5%",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Agri-webSA
            </Text>
          </TouchableRipple>
        )}

        <TouchableRipple onPress={() => console.log("pressed")}>
          <React.Fragment>
            <Icon size={30} name="shopping-cart" color="#556B2F" />
            {dicArrayConv(props.orders).length === 0 ? (
              <React.Fragment></React.Fragment>
            ) : (
              <Badge>{dicArrayConv(props.orders).length}</Badge>
            )}
          </React.Fragment>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log("pressed")}>
          <Icon size={30} name="person" color="#556B2F" />
        </TouchableRipple>
        <TouchableRipple onPress={() => console.log("pressed")}>
          <Icon size={30} name="menu" color="#556B2F" />
        </TouchableRipple>
      </View>
    </View>
  );
}

/*
{items.map((item) => (
        <Button
          icon="info"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.items}
        >
          {item.name}
        </Button>
      ))}
//////////////////////////////

<View key={item.key} style={styles.items}>
          <Text>{item.name}</Text>
          <Icon name={item.icon} />
        </View>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
  view: {
    flexDirection: "row",
    width: initialLayout["width"],
  },
});

const mapStateToProps = (state) => ({
  orders: state.addUpdateReducer.orders,
});

export default connect(mapStateToProps)(withNavigation(TopMenu));
